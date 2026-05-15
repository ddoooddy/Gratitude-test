import { getImages, getContent, getMenuItems } from "@/lib/db";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Menu from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  const images = getImages();
  const content = getContent();
  const menuItems = getMenuItems();

  const heroImage =
    images.find((i) => i.section === "hero")?.url ||
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80";

  const aboutImage =
    images.find((i) => i.section === "about")?.url ||
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=900&q=80";

  const galleryImages = images.filter((i) => i.section === "gallery");

  return (
    <>
      <Navbar />
      <main>
        <Hero
          imageUrl={heroImage}
          tagline={content.hero_tagline || "Cocina honesta, momentos que perduran."}
        />
        <About
          title={content.about_title || "Un lugar que nació del amor por lo auténtico"}
          subtitle={
            content.about_subtitle ||
            "Ingredientes de estación · Cocina de autor · Café de especialidad"
          }
          text={content.about_text || ""}
          imageUrl={aboutImage}
        />
        <Menu
          items={menuItems}
          sectionTitle={content.menu_section_title || "Nuestra Carta"}
          sectionSubtitle={
            content.menu_section_subtitle ||
            "Elaborada con ingredientes frescos y de temporada"
          }
        />
        <Gallery
          images={galleryImages}
          title={content.gallery_section_title || "Galería"}
          subtitle={
            content.gallery_section_subtitle || "Momentos, sabores y espacios"
          }
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
