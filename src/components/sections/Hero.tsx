"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  imageUrl: string;
  tagline: string;
}

export default function Hero({ imageUrl, tagline }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="Gratitude Restaurant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Decorative horizontal line */}
      <div
        className={`absolute top-1/2 left-0 right-0 h-px bg-white/10 transition-all duration-1000 delay-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p
          className={`text-[#e8c98a] text-xs tracking-[0.4em] uppercase mb-8 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Buenos Aires · Argentina
        </p>

        {/* Main title */}
        <h1
          className={`text-white transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(5rem, 15vw, 11rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
          }}
        >
          Gratitude
        </h1>

        {/* Divider */}
        <div
          className={`flex items-center justify-center gap-4 mt-8 mb-8 transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="h-px w-12 bg-white/40" />
          <span className="text-white/40 text-xs">✦</span>
          <span className="h-px w-12 bg-white/40" />
        </div>

        {/* Tagline */}
        <p
          className={`text-white/85 font-light text-lg md:text-xl max-w-xl mx-auto mb-12 italic transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {tagline}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a href="#menu" className="btn-primary">
            Ver Menú
          </a>
          <a href="#contacto" className="btn-outline">
            Reservar Mesa
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
