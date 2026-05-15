import Link from "next/link";

const socials = [
  { name: "Instagram", href: "https://instagram.com/gratitude.ba", icon: "IG" },
  { name: "Facebook", href: "https://facebook.com/gratitude.ba", icon: "FB" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a0f0c] text-[#faf8f5]/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p
              className="text-[#faf8f5] text-3xl mb-4"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Gratitude
            </p>
            <p className="text-sm leading-relaxed mb-6">
              Cocina honesta y artesanal en el corazón de Buenos Aires. Dos locales, un mismo espíritu.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#faf8f5]/20 flex items-center justify-center text-xs hover:border-[#e8c98a] hover:text-[#e8c98a] transition-colors"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sucursales */}
          <div>
            <h4 className="text-[#faf8f5] text-xs tracking-widest uppercase mb-5 font-medium">
              Sucursales
            </h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-[#e8c98a] font-medium mb-1">Palermo</p>
                <p>Av. Dorrego 1771</p>
                <p>Buenos Aires, Argentina</p>
              </div>
              <div>
                <p className="text-[#e8c98a] font-medium mb-1">San Fernando</p>
                <p>Av. Libertador 3180</p>
                <p>Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[#faf8f5] text-xs tracking-widest uppercase mb-5 font-medium">
              Contacto
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="tel:01148908683"
                className="block hover:text-[#e8c98a] transition-colors"
              >
                (011) 4890-8683
              </a>
              <a
                href="mailto:liligratitude@gmail.com.ar"
                className="block hover:text-[#e8c98a] transition-colors break-all"
              >
                liligratitude@gmail.com.ar
              </a>
            </div>

            <div className="mt-6">
              <h4 className="text-[#faf8f5] text-xs tracking-widest uppercase mb-3 font-medium">
                Navegación
              </h4>
              <div className="flex flex-col gap-2 text-sm">
                {["#nosotros", "#menu", "#galeria", "#contacto"].map((href) => (
                  <a
                    key={href}
                    href={href}
                    className="hover:text-[#e8c98a] transition-colors capitalize"
                  >
                    {href.replace("#", "")}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#faf8f5]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Gratitude. Todos los derechos reservados.</p>
          <Link
            href="/admin"
            className="text-[#faf8f5]/30 hover:text-[#faf8f5]/60 transition-colors"
          >
            Acceso administrador
          </Link>
        </div>
      </div>
    </footer>
  );
}
