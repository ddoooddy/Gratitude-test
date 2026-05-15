"use client";
import { useState } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import type { MenuItem, MenuCategory } from "@/types";

interface Props {
  items: MenuItem[];
  sectionTitle: string;
  sectionSubtitle: string;
}

const categories: { key: MenuCategory; label: string; icon: string }[] = [
  { key: "desayunos", label: "Desayunos", icon: "☀" },
  { key: "almuerzos", label: "Almuerzos", icon: "✦" },
  { key: "cafe", label: "Café", icon: "◎" },
  { key: "postres", label: "Postres", icon: "◇" },
];

export default function Menu({ items, sectionTitle, sectionSubtitle }: Props) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("desayunos");

  const filtered = items.filter((i) => i.category === activeCategory);

  return (
    <section id="menu" className="py-28 md:py-40 bg-[#f3ede4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <RevealOnScroll className="text-center mb-16">
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#c4a07e] font-medium mb-6">
            <span className="h-px w-8 bg-[#c4a07e]" />
            Carta
            <span className="h-px w-8 bg-[#c4a07e]" />
          </span>
          <h2
            className="text-[#2a1814] mb-4"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
            }}
          >
            {sectionTitle}
          </h2>
          <p
            className="text-[#5c3e33]/70 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            {sectionSubtitle}
          </p>
        </RevealOnScroll>

        {/* Category tabs */}
        <RevealOnScroll className="flex flex-wrap justify-center gap-2 mb-14" delay={100}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-6 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-[#2a1814] text-[#faf8f5]"
                  : "bg-transparent text-[#2a1814] border border-[#d8c0a5] hover:border-[#2a1814]"
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </RevealOnScroll>

        {/* Menu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 80}>
              <div className="menu-card bg-[#faf8f5] group cursor-default">
                {/* Image */}
                {item.imageUrl && (
                  <div className="img-zoom aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={600}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3
                      className="text-[#2a1814] text-xl leading-snug"
                      style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
                    >
                      {item.name}
                    </h3>
                    {item.price && (
                      <span
                        className="text-[#c4a07e] text-lg whitespace-nowrap"
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                      >
                        {item.price}
                      </span>
                    )}
                  </div>
                  <p className="text-[#5c3e33]/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll className="text-center mt-16" delay={200}>
          <p
            className="text-[#5c3e33]/60 mb-6 italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            La carta completa está disponible en el local
          </p>
          <a href="#contacto" className="btn-primary">
            Reservar Mesa
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
