import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getImages, saveImages } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { SiteImage } from "@/types";
import { randomUUID } from "crypto";

// GET — list all images
export async function GET() {
  const images = getImages();
  return NextResponse.json(images);
}

// POST — upload a new image
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const section = formData.get("section") as SiteImage["section"] | null;
    const alt = (formData.get("alt") as string) || "Imagen Gratitude";

    if (!file || !section) {
      return NextResponse.json({ error: "Archivo y sección requeridos" }, { status: 400 });
    }

    const validSections: SiteImage["section"][] = ["hero", "about", "gallery", "menu"];
    if (!validSections.includes(section)) {
      return NextResponse.json({ error: "Sección inválida" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${section}_${Date.now()}`;

    let url: string;
    let publicId: string | undefined;

    try {
      const uploaded = await uploadImage(buffer, section, filename);
      url = uploaded.url;
      publicId = uploaded.publicId;
    } catch {
      // Fallback: if Cloudinary is not configured, store as data URL (dev only)
      const base64 = buffer.toString("base64");
      const mimeType = file.type || "image/jpeg";
      url = `data:${mimeType};base64,${base64}`;
    }

    const newImage: SiteImage = {
      id: randomUUID(),
      section,
      url,
      publicId,
      alt,
      order: 99,
      createdAt: new Date().toISOString(),
    };

    const images = getImages();
    images.push(newImage);
    saveImages(images);

    return NextResponse.json(newImage, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}
