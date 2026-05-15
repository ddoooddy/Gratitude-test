"use client";
import { useState } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import type { SiteImage } from "@/types";

interface Props {
  images: SiteImage[];
  title: string;
  subtitle: string;
}

export default function Gallery({ images, title, subtitle }: Props) {
  const [lightbox, setLightbox] = useState<SiteImage | null>(null);

  return (
    <section id="galeria" className="py-28 md:py-40 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <RevealOnScroll className="text-center mb-16">
          <span className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase text-[#c4a07e] font-medium mb-6">
            <span className="h-px w-8 bg-[#c4a07e]" />
            Galería
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
            {title}
          </h2>
          <p
            className="text-[#5c3e33]/70 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            {subtitle}
          </p>
        </RevealOnScroll>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.slice(0, 6).map((img, i) => {
            const tall = i === 0 || i === 3;
            return (
              <RevealOnScroll key={img.id} delay={i * 80} className={tall ? "row-span-2" : ""}>
                <div
                  className={`img-zoom cursor-pointer overflow-hidden ${
                    tall ? "h-full min-h-[500px]" : "h-56 md:h-64"
                  }`}
                  onClick={() => setLightbox(img)}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={800}
                    height={tall ? 800 : 500}
                    className="object-cover w-full h-full"
                  />
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Quote */}
        <RevealOnScroll className="text-center mt-20 max-w-2xl mx-auto" delay={200}>
          <span className="text-[#e8c98a] text-5xl leading-none font-serif">"</span>
          <p
            className="text-[#5c3e33] text-xl md:text-2xl leading-relaxed -mt-4"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Comer bien es una forma de agradecer a la vida.
          </p>
          <div className="section-divider mt-8" />
        </RevealOnScroll>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.url}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[85vh]"
            />
            <p className="text-white/60 text-sm text-center mt-3">{lightbox.alt}</p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 text-white/80 hover:text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
