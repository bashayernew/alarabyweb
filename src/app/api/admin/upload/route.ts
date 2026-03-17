import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireWrite } from "@/lib/auth-helpers";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 4 * 1024 * 1024; // 4MB (Vercel body limit ~4.5MB)
const ALLOWED_FOLDERS = ["products", "services", "maintenance"] as const;

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("[upload] BLOB_READ_WRITE_TOKEN is not set");
    return NextResponse.json(
      { error: "Missing blob configuration" },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (e) {
    console.error("[upload] formData parse error:", e);
    return NextResponse.json(
      { error: "Invalid request body", details: e instanceof Error ? e.message : String(e) },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!file) {
    return NextResponse.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  const isFile = file instanceof File;
  const isBlob = typeof Blob !== "undefined" && file instanceof Blob;
  if (!isFile && !isBlob) {
    console.error("[upload] file is not File or Blob:", typeof file);
    return NextResponse.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  const blobLike = file as File | Blob;
  const fileSize = blobLike.size;
  const fileType = blobLike.type || "image/jpeg";
  const fileName = isFile ? (file as File).name : "image.jpg";
  const folder = formData.get("folder") as string | null;
  const targetFolder =
    folder && ALLOWED_FOLDERS.includes(folder as (typeof ALLOWED_FOLDERS)[number])
      ? (folder as (typeof ALLOWED_FOLDERS)[number])
      : "products";

  if (!ALLOWED_TYPES.includes(fileType)) {
    return NextResponse.json(
      { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
      { status: 400 }
    );
  }
  if (fileSize > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Max 4MB." },
      { status: 400 }
    );
  }

  const ext = fileName.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext)
    ? ext
    : "jpg";
  const pathname = `${targetFolder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;

  try {
    const buffer = Buffer.from(await blobLike.arrayBuffer());
    const blob = await put(pathname, buffer, {
      access: "public",
      addRandomSuffix: false,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error("[upload] Blob upload failed:", err);
    return NextResponse.json(
      {
        error: "Blob upload failed",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
