/**
 * Simple JSON-file database for local dev / small deployments.
 * Replace with Supabase calls in production via supabase.ts.
 */
import fs from "fs";
import path from "path";
import { SiteImage, MenuItem } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function read<T>(file: string, fallback: T): T {
  ensureDir();
  const filepath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filepath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function write<T>(file: string, data: T): void {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// ─── Images ───────────────────────────────────────────────
export function getImages(): SiteImage[] {
  return read<SiteImage[]>("images.json", defaultImages);
}

export function saveImages(images: SiteImage[]): void {
  write("images.json", images);
}

// ─── Content ──────────────────────────────────────────────
export function getContent(): Record<string, string> {
  return read<Record<string, string>>("content.json", defaultContent);
}

export function saveContent(content: Record<string, string>): void {
  write("content.json", content);
}

// ─── Menu ─────────────────────────────────────────────────
export function getMenuItems(): MenuItem[] {
  return read<MenuItem[]>("menu.json", defaultMenu);
}

export function saveMenuItems(items: MenuItem[]): void {
  write("menu.json", items);
}

// ─── Default data (used on first run) ─────────────────────
const defaultImages: SiteImage[] = [
  {
    id: "hero-1",
    section: "hero",
    url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80",
    alt: "Interior de Gratitude",
    order: 0,
  },
  {
    id: "about-1",
    section: "about",
    url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=900&q=80",
    alt: "Nuestro equipo",
    order: 0,
  },
  {
    id: "gallery-1",
    section: "gallery",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    alt: "Café especial",
    order: 0,
  },
  {
    id: "gallery-2",
    section: "gallery",
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    alt: "Plato del día",
    order: 1,
  },
  {
    id: "gallery-3",
    section: "gallery",
    url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    alt: "Ambiente Gratitude",
    order: 2,
  },
  {
    id: "gallery-4",
    section: "gallery",
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    alt: "Pizza artesanal",
    order: 3,
  },
  {
    id: "gallery-5",
    section: "gallery",
    url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
    alt: "Tostadas de autor",
    order: 4,
  },
  {
    id: "gallery-6",
    section: "gallery",
    url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80",
    alt: "Hamburguesa gourmet",
    order: 5,
  },
];

const defaultContent: Record<string, string> = {
  hero_tagline: "Cocina honesta, momentos que perduran.",
  about_title: "Un lugar que nació del amor por lo auténtico",
  about_text:
    "Gratitude es más que un restaurante. Es un espacio donde cada plato cuenta una historia de ingredientes elegidos con cuidado, preparaciones artesanales y el calor de quienes lo hacen posible. Nacimos en Palermo con la convicción de que comer bien es un acto de gratitud hacia uno mismo y hacia quienes nos rodean.",
  about_subtitle: "Ingredientes de estación · Cocina de autor · Café de especialidad",
  menu_section_title: "Nuestra Carta",
  menu_section_subtitle: "Elaborada con ingredientes frescos y de temporada",
  gallery_section_title: "Galería",
  gallery_section_subtitle: "Momentos, sabores y espacios",
};

const defaultMenu: MenuItem[] = [
  // Desayunos
  {
    id: "d1",
    category: "desayunos",
    name: "Tostadas Gratitude",
    description: "Pan de masa madre, palta, huevo pochado y semillas tostadas",
    price: "$2.800",
    imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80",
    order: 0,
  },
  {
    id: "d2",
    category: "desayunos",
    name: "Bowl de Granola",
    description: "Granola artesanal, yogur griego, frutas de estación y miel de colmena",
    price: "$2.400",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    order: 1,
  },
  {
    id: "d3",
    category: "desayunos",
    name: "Pancakes de Avena",
    description: "Pancakes esponjosos con syrup de arce, berries y mantequilla de nuez",
    price: "$2.600",
    imageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&q=80",
    order: 2,
  },
  // Almuerzos
  {
    id: "a1",
    category: "almuerzos",
    name: "Bowl Mediterráneo",
    description: "Quinoa, falafel, pepino, tomate, tzatziki y aceitunas",
    price: "$3.600",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    order: 0,
  },
  {
    id: "a2",
    category: "almuerzos",
    name: "Tarta de Hongos",
    description: "Masa de mantequilla, crema de ricotta, hongos salteados y tomillo fresco",
    price: "$3.200",
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80",
    order: 1,
  },
  {
    id: "a3",
    category: "almuerzos",
    name: "Salmón Gratitude",
    description: "Salmón sellado, puré de batata, espinaca salteada y salsa de limón",
    price: "$5.200",
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    order: 2,
  },
  // Café
  {
    id: "c1",
    category: "cafe",
    name: "Flat White",
    description: "Doble espresso con leche vaporizada texturada. Granos de origen único",
    price: "$1.800",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    order: 0,
  },
  {
    id: "c2",
    category: "cafe",
    name: "Cold Brew",
    description: "Infusión en frío por 18 horas, servido con hielo y leche de avena",
    price: "$2.200",
    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    order: 1,
  },
  // Postres
  {
    id: "p1",
    category: "postres",
    name: "Cheesecake de Frutos Rojos",
    description: "Cheesecake horneado con coulis de frambuesa y crumble de avena",
    price: "$2.400",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    order: 0,
  },
  {
    id: "p2",
    category: "postres",
    name: "Brownie Gratitude",
    description: "Brownie de chocolate amargo 70%, helado de vainilla y nueces",
    price: "$2.200",
    imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
    order: 1,
  },
];
