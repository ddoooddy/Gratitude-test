import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Gratitude — Restaurante & Café | Buenos Aires",
  description:
    "Gratitude es un espacio de cocina honesta y artesanal en el corazón de Buenos Aires. Descubrí nuestro menú, galería y reservas.",
  keywords: "restaurante, café, Buenos Aires, Palermo, San Fernando, cocina artesanal, desayunos, almuerzos",
  openGraph: {
    title: "Gratitude — Restaurante & Café",
    description: "Cocina honesta y artesanal en Buenos Aires.",
    siteName: "Gratitude",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratitude — Restaurante & Café",
    description: "Cocina honesta y artesanal en Buenos Aires.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#faf8f5]">
        {children}
      </body>
    </html>
  );
}
