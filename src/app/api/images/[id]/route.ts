import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getImages, saveImages } from "@/lib/db";
import { deleteImage } from "@/lib/cloudinary";

// DELETE — remove an image
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const images = getImages();
  const target = images.find((img) => img.id === id);

  if (!target) {
    return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
  }

  // Delete from Cloudinary if publicId exists
  if (target.publicId) {
    try {
      await deleteImage(target.publicId);
    } catch {
      // Non-fatal: continue even if Cloudinary delete fails
    }
  }

  const updated = images.filter((img) => img.id !== id);
  saveImages(updated);

  return NextResponse.json({ ok: true });
}

// PATCH — update alt text or order
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const images = getImages();
  const idx = images.findIndex((img) => img.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
  }

  images[idx] = { ...images[idx], ...body, id };
  saveImages(images);

  return NextResponse.json(images[idx]);
}
