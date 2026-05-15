"use client";
import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const branches = [
  {
    name: "Palermo",
    address: "Av. Dorrego 1771",
    city: "Palermo, Buenos Aires",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.7!2d-58.4435!3d-34.5769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM0JzM2LjgiUyA1OMKwMjYnMzYuNiJX!5e0!3m2!1ses!2sar!4v1",
  },
  {
    name: "San Fernando",
    address: "Av. Libertador 3180",
    city: "San Fernando, Buenos Aires",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3287!2d-58.5560!3d-34.4459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI2JzQ1LjIiUyA1OMKwMzMnMjEuNiJX!5e0!3m2!1ses!2sar!4v1",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="py-28 md:py-40 bg-[#2a1814]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <RevealOnScroll className="text-center mb-20">
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#e8c98a] font-medium mb-6">
            <span className="h-px w-8 bg-[#e8c98a]" />
            Contacto
            <span className="h-px w-8 bg-[#e8c98a]" />
          </span>
          <h2
            className="text-[#faf8f5]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
            }}
          >
            Encontranos
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info + Branches */}
          <RevealOnScroll direction="left">
            <div>
              {/* Contact info */}
              <div className="mb-12">
                <h3
                  className="text-[#e8c98a] text-lg mb-6"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Información de contacto
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:01148908683"
                    className="flex items-center gap-4 text-[#faf8f5]/80 hover:text-[#e8c98a] transition-colors group"
                  >
                    <span className="w-10 h-10 border border-[#e8c98a]/30 flex items-center justify-center text-[#e8c98a] group-hover:border-[#e8c98a] transition-colors">
                      ☎
                    </span>
                    <span>(011) 4890-8683</span>
                  </a>
                  <a
                    href="mailto:liligratitude@gmail.com.ar"
                    className="flex items-center gap-4 text-[#faf8f5]/80 hover:text-[#e8c98a] transition-colors group"
                  >
                    <span className="w-10 h-10 border border-[#e8c98a]/30 flex items-center justify-center text-[#e8c98a] group-hover:border-[#e8c98a] transition-colors">
                      ✉
                    </span>
                    <span>liligratitude@gmail.com.ar</span>
                  </a>
                </div>
              </div>

              {/* Branches */}
              <div>
                <h3
                  className="text-[#e8c98a] text-lg mb-6"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Nuestras sucursales
                </h3>
                <div className="space-y-8">
                  {branches.map((branch) => (
                    <div key={branch.name}>
                      <div className="flex items-start gap-4 mb-4">
                        <span className="w-10 h-10 border border-[#e8c98a]/30 flex items-center justify-center text-[#e8c98a] shrink-0 mt-0.5">
                          ◎
                        </span>
                        <div>
                          <p
                            className="text-[#faf8f5] font-medium mb-1"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {branch.name}
                          </p>
                          <p className="text-[#faf8f5]/60 text-sm">{branch.address}</p>
                          <p className="text-[#faf8f5]/60 text-sm">{branch.city}</p>
                        </div>
                      </div>
                      {/* Map */}
                      <div className="ml-14 rounded-none overflow-hidden h-40">
                        <iframe
                          src={branch.mapUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Mapa ${branch.name}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Contact form */}
          <RevealOnScroll direction="right">
            <div>
              <h3
                className="text-[#e8c98a] text-lg mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Envianos un mensaje
              </h3>

              {status === "ok" ? (
                <div className="border border-[#e8c98a]/30 p-8 text-center">
                  <p className="text-[#e8c98a] text-3xl mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
                    ¡Gracias!
                  </p>
                  <p className="text-[#faf8f5]/70 text-sm">
                    Tu mensaje fue enviado. Te respondemos a la brevedad.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-xs tracking-widest uppercase text-[#e8c98a] border border-[#e8c98a]/40 px-6 py-2 hover:border-[#e8c98a] transition-colors"
                  >
                    Enviar otro
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#faf8f5]/50 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full bg-transparent border-b border-[#faf8f5]/20 text-[#faf8f5] placeholder-[#faf8f5]/30 py-3 focus:outline-none focus:border-[#e8c98a] transition-colors text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#faf8f5]/50 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full bg-transparent border-b border-[#faf8f5]/20 text-[#faf8f5] placeholder-[#faf8f5]/30 py-3 focus:outline-none focus:border-[#e8c98a] transition-colors text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#faf8f5]/50 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full bg-transparent border-b border-[#faf8f5]/20 text-[#faf8f5] placeholder-[#faf8f5]/30 py-3 focus:outline-none focus:border-[#e8c98a] transition-colors text-sm resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs">
                      Hubo un error. Por favor intentá de nuevo o escribinos directamente al email.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 bg-[#e8c98a] text-[#2a1814] text-xs tracking-widest uppercase font-medium hover:bg-[#dcb057] transition-colors disabled:opacity-60"
                  >
                    {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
                  </button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
