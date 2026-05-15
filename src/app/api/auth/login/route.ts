import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
    }

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    // Hash stored as base64 to avoid $ interpolation in .env files
    const hashB64 = process.env.ADMIN_PASSWORD_HASH_B64 || "";
    const adminHash = hashB64
      ? Buffer.from(hashB64, "base64").toString("utf8")
      : "";

    if (username !== adminUsername) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, adminHash);
    if (!valid) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const token = await createToken({ username, role: "admin" });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
