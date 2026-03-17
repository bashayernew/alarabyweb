import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireWrite } from "@/lib/auth-helpers";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FOLDERS = ["products", "services", "maintenance"] as const;

export async function POST(req: NextRequest) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not configured. Add Vercel Blob Storage to your project.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") as string | null;
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }
    const targetFolder =
      folder && ALLOWED_FOLDERS.includes(folder as (typeof ALLOWED_FOLDERS)[number])
        ? (folder as (typeof ALLOWED_FOLDERS)[number])
        : "products";
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max 5MB." },
        { status: 400 }
      );
    }
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext)
      ? ext
      : "jpg";
    const pathname = `${targetFolder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error("[upload]", e);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
