"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import type { SiteImage } from "@/types";

interface Props {
  images: SiteImage[];
  onRefresh: () => void;
}

const SECTIONS: { key: SiteImage["section"]; label: string }[] = [
  { key: "hero", label: "Hero / Portada" },
  { key: "about", label: "Sobre Nosotros" },
  { key: "gallery", label: "Galería" },
  { key: "menu", label: "Menú" },
];

export default function ImageManager({ images, onRefresh }: Props) {
  const [activeSection, setActiveSection] = useState<SiteImage["section"]>("gallery");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadAlt, setUploadAlt] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sectionImages = images.filter((img) => img.section === activeSection);

  const showFeedback = (type: "ok" | "error", msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setUploading(true);

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;

        const fd = new FormData();
        fd.append("file", file);
        fd.append("section", activeSection);
        fd.append("alt", uploadAlt || file.name.replace(/\.[^.]+$/, ""));

        try {
          const res = await fetch("/api/images", { method: "POST", body: fd });
          if (!res.ok) throw new Error("Upload failed");
        } catch {
          showFeedback("error", `Error al subir ${file.name}`);
        }
      }

      setUploading(false);
      setUploadAlt("");
      setPreview(null);
      onRefresh();
      showFeedback("ok", "Imagen subida correctamente");
    },
    [activeSection, uploadAlt, onRefresh]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/images/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onRefresh();
      showFeedback("ok", "Imagen eliminada");
    } catch {
      showFeedback("error", "Error al eliminar la imagen");
    } finally {
      setDeleteId(null);
    }
  };

  const handleFilePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {/* Feedback toast */}
      {feedback && (
        <div
          className={`mb-6 px-4 py-3 text-sm border ${
            feedback.type === "ok"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {feedback.msg}
        </div>
      )}

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`px-5 py-2.5 text-xs tracking-wider uppercase font-medium transition-all ${
              activeSection === s.key
                ? "bg-[#2a1814] text-[#faf8f5]"
                : "border border-[#d8c0a5] text-[#5c3e33] hover:border-[#2a1814]"
            }`}
          >
            {s.label}
            <span className="ml-2 opacity-60">
              ({images.filter((i) => i.section === s.key).length})
            </span>
          </button>
        ))}
      </div>

      {/* Upload zone */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-[#2a1814] mb-4 tracking-wide">
          Subir nueva imagen a:{" "}
          <span className="text-[#c4a07e]">
            {SECTIONS.find((s) => s.key === activeSection)?.label}
          </span>
        </h3>

        {/* Alt text */}
        <input
          type="text"
          value={uploadAlt}
          onChange={(e) => setUploadAlt(e.target.value)}
          placeholder="Descripción de la imagen (alt text)"
          className="w-full border border-[#e8d9c8] px-4 py-2.5 text-sm text-[#2a1814] mb-3 focus:outline-none focus:border-[#c4a07e] transition-colors"
        />

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-none cursor-pointer transition-all p-8 text-center ${
            dragOver
              ? "border-[#c4a07e] bg-[#f9f0e1]"
              : "border-[#d8c0a5] bg-[#faf8f5] hover:border-[#c4a07e]"
          }`}
        >
          {preview ? (
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="max-h-48 mx-auto object-contain" />
              <p className="text-xs text-[#5c3e33]/60 mt-3">Click para cambiar · Arrastrá para soltar</p>
            </div>
          ) : (
            <>
              <div className="text-4xl text-[#d8c0a5] mb-3">↑</div>
              <p className="text-sm text-[#5c3e33]/70">
                {uploading ? "Subiendo..." : "Arrastrá imágenes aquí o hacé click para seleccionar"}
              </p>
              <p className="text-xs text-[#5c3e33]/40 mt-2">JPG, PNG, WebP · Máx. 10MB</p>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFilePreview(e);
            handleFiles(e.target.files);
          }}
        />

        {uploading && (
          <div className="mt-3 flex items-center gap-2 text-sm text-[#5c3e33]/70">
            <div className="w-4 h-4 border-2 border-[#c4a07e] border-t-transparent rounded-full animate-spin" />
            Subiendo imagen...
          </div>
        )}
      </div>

      {/* Current images */}
      <div>
        <h3 className="text-sm font-medium text-[#2a1814] mb-4 tracking-wide">
          Imágenes actuales ({sectionImages.length})
        </h3>

        {sectionImages.length === 0 ? (
          <div className="border border-dashed border-[#d8c0a5] p-12 text-center">
            <p className="text-sm text-[#5c3e33]/50">No hay imágenes en esta sección</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sectionImages.map((img) => (
              <div key={img.id} className="group relative bg-[#f3ede4] border border-[#e8d9c8]">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={img.url.startsWith("data:") ? img.url : img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    unoptimized={img.url.startsWith("data:")}
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 hover:bg-white/40 text-white px-3 py-1.5 text-xs transition-colors"
                      title="Ver original"
                    >
                      Ver
                    </a>
                    <button
                      onClick={() => setDeleteId(img.id)}
                      className="bg-red-500/80 hover:bg-red-600 text-white px-3 py-1.5 text-xs transition-colors"
                      title="Eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Alt label */}
                <div className="px-2 py-2">
                  <p className="text-xs text-[#5c3e33]/70 truncate" title={img.alt}>
                    {img.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] max-w-sm w-full p-8 shadow-2xl">
            <h3
              className="text-xl text-[#2a1814] mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              ¿Eliminár imagen?
            </h3>
            <p className="text-sm text-[#5c3e33]/70 mb-8">
              Esta acción no se puede deshacer. La imagen será eliminada del sitio y del almacenamiento.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 border border-[#d8c0a5] text-sm text-[#5c3e33] hover:border-[#2a1814] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-3 bg-red-600 text-white text-sm hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
