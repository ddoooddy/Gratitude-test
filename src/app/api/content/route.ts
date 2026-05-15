import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/db";

// GET — all content
export async function GET() {
  const content = getContent();
  return NextResponse.json(content);
}

// PUT — update content key-value pairs
export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await req.json();

    // Whitelist allowed keys
    const allowed = [
      "hero_tagline",
      "about_title",
      "about_text",
      "about_subtitle",
      "menu_section_title",
      "menu_section_subtitle",
      "gallery_section_title",
      "gallery_section_subtitle",
    ];

    const current = getContent();
    const updated = { ...current };

    for (const key of allowed) {
      if (key in body && typeof body[key] === "string") {
        updated[key] = body[key];
      }
    }

    saveContent(updated);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
