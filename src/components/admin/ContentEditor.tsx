"use client";
import { useState } from "react";

interface Props {
  content: Record<string, string>;
  onSaved: () => void;
}

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "hero_tagline", label: "Tagline del Hero (portada)" },
  { key: "about_title", label: "Título — Sobre Nosotros" },
  { key: "about_subtitle", label: "Subtítulo — Sobre Nosotros" },
  { key: "about_text", label: "Texto — Sobre Nosotros", multiline: true },
  { key: "menu_section_title", label: "Título de sección — Menú" },
  { key: "menu_section_subtitle", label: "Subtítulo de sección — Menú" },
  { key: "gallery_section_title", label: "Título de sección — Galería" },
  { key: "gallery_section_subtitle", label: "Subtítulo de sección — Galería" },
];

export default function ContentEditor({ content, onSaved }: Props) {
  const [values, setValues] = useState<Record<string, string>>(content);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; msg: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      onSaved();
      setFeedback({ type: "ok", msg: "✓ Cambios guardados. El sitio se actualizó automáticamente." });
    } catch {
      setFeedback({ type: "error", msg: "Error al guardar. Intentá de nuevo." });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div>
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

      <div className="space-y-6">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-xs tracking-wider uppercase text-[#5c3e33]/70 mb-2 font-medium">
              {field.label}
            </label>
            {field.multiline ? (
              <textarea
                rows={5}
                value={values[field.key] || ""}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                className="w-full border border-[#e8d9c8] px-4 py-3 text-sm text-[#2a1814] focus:outline-none focus:border-[#c4a07e] transition-colors resize-y bg-white"
              />
            ) : (
              <input
                type="text"
                value={values[field.key] || ""}
                onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                className="w-full border border-[#e8d9c8] px-4 py-3 text-sm text-[#2a1814] focus:outline-none focus:border-[#c4a07e] transition-colors bg-white"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#e8d9c8] flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3.5 bg-[#2a1814] text-[#faf8f5] text-xs tracking-widest uppercase font-medium hover:bg-[#3d2420] transition-colors disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
        <button
          onClick={() => setValues(content)}
          disabled={saving}
          className="px-8 py-3.5 border border-[#d8c0a5] text-xs tracking-widest uppercase font-medium text-[#5c3e33] hover:border-[#2a1814] transition-colors disabled:opacity-60"
        >
          Descartar
        </button>
      </div>
    </div>
  );
}
