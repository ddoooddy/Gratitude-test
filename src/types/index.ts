export interface SiteImage {
  id: string;
  section: "hero" | "about" | "gallery" | "menu";
  url: string;
  publicId?: string;
  alt: string;
  order?: number;
  createdAt?: string;
}

export interface SiteContent {
  key: string;
  value: string;
  label?: string;
}

export interface MenuItem {
  id: string;
  category: "desayunos" | "almuerzos" | "cafe" | "postres";
  name: string;
  description: string;
  price?: string;
  imageUrl?: string;
  order?: number;
}

export type MenuCategory = "desayunos" | "almuerzos" | "cafe" | "postres";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
