import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Attempt SMTP send if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"Gratitude Web" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `Nuevo mensaje de contacto — ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:auto">
            <h2 style="color:#2a1814">Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border:none;border-top:1px solid #e8d9c8;margin:16px 0"/>
            <p style="white-space:pre-wrap">${message}</p>
          </div>
        `,
      });
    } else {
      // Log to console in dev when SMTP not configured
      console.log("📩 Nuevo mensaje de contacto:", { name, email, message });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }
}
