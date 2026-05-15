import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

interface Props {
  title: string;
  subtitle: string;
  text: string;
  imageUrl: string;
}

export default function About({ title, subtitle, text, imageUrl }: Props) {
  return (
    <section id="nosotros" className="py-28 md:py-40 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <RevealOnScroll className="flex items-center gap-4 mb-20">
          <span className="h-px w-12 bg-[#c4a07e]" />
          <span className="text-xs tracking-[0.35em] uppercase text-[#c4a07e] font-medium">
            Sobre Nosotros
          </span>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <div>
            <RevealOnScroll direction="left">
              <h2
                className="text-[#2a1814] mb-6 leading-none"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="left" delay={150}>
              <p
                className="text-[#c4a07e] text-sm tracking-widest uppercase mb-8 font-medium"
              >
                {subtitle}
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="left" delay={250}>
              <p
                className="text-[#5c3e33]/80 text-lg leading-relaxed mb-10"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
              >
                {text}
              </p>
            </RevealOnScroll>

            {/* Stats */}
            <RevealOnScroll direction="left" delay={350}>
              <div className="grid grid-cols-3 gap-8 pt-10 border-t border-[#e8d9c8]">
                {[
                  { num: "2015", label: "Fundado" },
                  { num: "2", label: "Sucursales" },
                  { num: "100%", label: "Artesanal" },
                ].map((stat) => (
                  <div key={stat.num}>
                    <p
                      className="text-3xl text-[#2a1814] mb-1"
                      style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                    >
                      {stat.num}
                    </p>
                    <p className="text-xs tracking-widest uppercase text-[#c4a07e]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Image side */}
          <RevealOnScroll direction="right" className="relative">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-[#e8d9c8] rounded-none z-0" />

              {/* Main image */}
              <div className="relative z-10 img-zoom aspect-[4/5] overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Gratitude — Nuestro equipo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#2a1814] text-[#faf8f5] p-6 z-20 shadow-xl">
                <p
                  className="text-4xl leading-none mb-1"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  10+
                </p>
                <p className="text-xs tracking-widest uppercase text-[#c4a07e]">
                  Años de sabor
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
