import { NextRequest, NextResponse } from "next/server";
import { requireWrite } from "@/lib/auth-helpers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FOLDERS = ["products", "services", "maintenance"] as const;

export async function POST(req: NextRequest) {
  const auth = await requireWrite();
  if (auth.res) return auth.res;

  // On Vercel, filesystem is read-only. Uploads need Vercel Blob or similar.
  if (process.env.VERCEL) {
    return NextResponse.json(
      {
        error:
          "File uploads are not available in production. Configure Vercel Blob Storage or use an external storage provider.",
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
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", targetFolder);
    await mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));
    const url = `/uploads/${targetFolder}/${filename}`;
    return NextResponse.json({ url });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
