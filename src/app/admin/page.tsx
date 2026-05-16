"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) router.replace("/admin/dashboard");
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Credenciales inválidas");
      }
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3ede4] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="text-4xl text-[#2a1814] mb-2 block"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Gratitude
          </Link>
          <p className="text-xs tracking-[0.3em] uppercase text-[#c4a07e]">
            Panel de Administración
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#faf8f5] border border-[#e8d9c8] p-10">
          <h1
            className="text-2xl text-[#2a1814] mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Iniciar sesión
          </h1>
          <p className="text-[#5c3e33]/60 text-sm mb-8">
            Acceso exclusivo para administradores
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#5c3e33]/70 mb-2">
                Usuario
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-[#e8d9c8] px-4 py-3 text-sm text-[#2a1814] bg-white focus:outline-none focus:border-[#c4a07e] transition-colors"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#5c3e33]/70 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#e8d9c8] px-4 py-3 text-sm text-[#2a1814] bg-white focus:outline-none focus:border-[#c4a07e] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#2a1814] text-[#faf8f5] text-xs tracking-widest uppercase font-medium hover:bg-[#3d2420] transition-colors disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#5c3e33]/40 mt-6">
          <Link href="/" className="hover:text-[#5c3e33]/70 transition-colors">
            ← Volver al sitio
          </Link>
        </p>
      </div>
    </div>
  );
}
