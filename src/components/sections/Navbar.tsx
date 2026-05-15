"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#menu", label: "Menú" },
  { href: "#galeria", label: "Galería" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#faf8f5]/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="group">
          <span
            className={`font-display text-2xl tracking-wider transition-colors duration-300 ${
              scrolled ? "text-[#2a1814]" : "text-[#faf8f5]"
            }`}
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Gratitude
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-[#2a1814] hover:text-[#c4a07e]"
                  : "text-[#faf8f5]/90 hover:text-[#faf8f5]"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={`text-xs tracking-widest uppercase font-medium px-6 py-2.5 border transition-all duration-300 ${
              scrolled
                ? "border-[#2a1814] text-[#2a1814] hover:bg-[#2a1814] hover:text-[#faf8f5]"
                : "border-[#faf8f5]/60 text-[#faf8f5] hover:border-[#faf8f5] hover:bg-[#faf8f5]/10"
            }`}
          >
            Reservar
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-1 transition-colors duration-300 ${
            scrolled ? "text-[#2a1814]" : "text-[#faf8f5]"
          }`}
          aria-label="Abrir menú"
        >
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#faf8f5] transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 border-t border-[#e8d9c8]" : "max-h-0"
        }`}
      >
        <nav className="px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-[#2a1814] hover:text-[#c4a07e] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="text-xs tracking-widest uppercase px-6 py-3 border border-[#2a1814] text-[#2a1814] text-center hover:bg-[#2a1814] hover:text-[#faf8f5] transition-all"
          >
            Reservar
          </a>
        </nav>
      </div>
    </header>
  );
}
