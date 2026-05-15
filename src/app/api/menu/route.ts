import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getMenuItems, saveMenuItems } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getMenuItems());
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const items = await req.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Se esperaba un array" }, { status: 400 });
    }
    saveMenuItems(items);
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
