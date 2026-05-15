"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import ImageManager from "@/components/admin/ImageManager";
import ContentEditor from "@/components/admin/ContentEditor";
import type { SiteImage } from "@/types";

type Tab = "images" | "content" | "preview";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("images");
  const [images, setImages] = useState<SiteImage[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadData = useCallback(async () => {
    try {
      const [imgRes, contentRes] = await Promise.all([
        fetch("/api/images"),
        fetch("/api/content"),
      ]);
      setImages(await imgRes.json());
      setContent(await contentRes.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "images", label: "Imágenes", count: images.length },
    { key: "content", label: "Textos" },
    { key: "preview", label: "Vista previa" },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f3ede4]">
        {/* Top bar */}
        <header className="bg-[#2a1814] text-[#faf8f5] px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              >
                Gratitude
              </a>
              <span className="text-[#faf8f5]/30 text-xs tracking-widest uppercase">
                Panel Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-[#faf8f5]/60 hover:text-[#e8c98a] transition-colors"
              >
                Ver sitio ↗
              </a>
              <button
                onClick={handleLogout}
                className="text-xs tracking-widest uppercase text-[#faf8f5]/60 hover:text-red-400 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Welcome */}
          <div className="mb-8">
            <h1
              className="text-3xl text-[#2a1814] mb-1"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              Panel de Administración
            </h1>
            <p className="text-sm text-[#5c3e33]/60">
              Gestioná las imágenes y textos del sitio sin necesidad de un desarrollador.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total imágenes", value: images.length },
              { label: "Hero", value: images.filter((i) => i.section === "hero").length },
              { label: "Galería", value: images.filter((i) => i.section === "gallery").length },
              { label: "Menú", value: images.filter((i) => i.section === "menu").length },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#faf8f5] border border-[#e8d9c8] p-5">
                <p
                  className="text-3xl text-[#2a1814] mb-1"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-[#5c3e33]/60 tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-[#e8d9c8] mb-8 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3.5 text-xs tracking-widest uppercase font-medium transition-all border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-[#c4a07e] text-[#2a1814]"
                    : "border-transparent text-[#5c3e33]/60 hover:text-[#2a1814]"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-2 text-[#c4a07e]">({tab.count})</span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-[#faf8f5] border border-[#e8d9c8] p-8">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#c4a07e] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {activeTab === "images" && (
                  <ImageManager images={images} onRefresh={loadData} />
                )}
                {activeTab === "content" && (
                  <ContentEditor content={content} onSaved={loadData} />
                )}
                {activeTab === "preview" && (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm text-[#5c3e33]/70">
                        Vista previa del sitio en tiempo real
                      </p>
                      <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-widest uppercase text-[#c4a07e] border border-[#c4a07e] px-4 py-2 hover:bg-[#c4a07e] hover:text-white transition-colors"
                      >
                        Abrir en nueva pestaña ↗
                      </a>
                    </div>
                    <div className="border border-[#e8d9c8] overflow-hidden" style={{ height: "70vh" }}>
                      <iframe
                        src="/"
                        className="w-full h-full"
                        title="Vista previa del sitio"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
