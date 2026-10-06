"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function Error({ error, reset }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[var(--color-carbon)] flex flex-col items-center justify-center px-4">
      <SiteHeader currentPage="error" />

      <main className="flex-1 flex flex-col items-center justify-center text-center py-16">
        <h1 className="font-[var(--font-anton)] text-6xl md:text-8xl text-[var(--color-lacra)] mb-4">Error</h1>
        <h2 className="font-[var(--font-anton)] text-2xl md:text-3xl text-[var(--color-espuma)] mb-6">Algo salió mal</h2>
        <p className="text-[var(--color-espuma-tenue)] max-w-md mb-8 font-[var(--font-mono)] text-sm">
          {error?.message || "Error inesperado"}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => reset?.()}
            className="btn-primary"
          >
            REINTENTAR
          </button>
          <Link href="/" className="btn-primary bg-transparent border-2 border-[var(--color-espuma-tenue)] text-[var(--color-espuma-tenue)] hover:border-[var(--color-espuma)] hover:text-[var(--color-espuma)]">
            IR AL INICIO
          </Link>
        </div>
      </main>

      <footer className="border-t border-[var(--border-subtle)] py-8 px-4 w-full">
        <div className="container mx-auto text-center text-sm text-[var(--color-espuma-tenue)]">
          <p>TAPEO — Amistad e irreverencia</p>
        </div>
      </footer>
    </div>
  );
}