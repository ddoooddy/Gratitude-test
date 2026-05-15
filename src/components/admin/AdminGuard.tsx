"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => {
        if (r.status === 401) {
          router.replace("/admin");
        } else {
          setChecking(false);
        }
      })
      .catch(() => router.replace("/admin"));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#f3ede4] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#c4a07e] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs tracking-widest uppercase text-[#5c3e33]/60">Verificando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
