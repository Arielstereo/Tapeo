import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-carbon)] flex flex-col items-center justify-center px-4">
      <SiteHeader currentPage="404" />

      <main className="flex-1 flex flex-col items-center justify-center text-center py-16">
        <h1 className="font-[var(--font-anton)] text-6xl md:text-8xl text-[var(--color-espuma)] mb-4">404</h1>
        <h2 className="font-[var(--font-anton)] text-2xl md:text-3xl text-[var(--color-ambar)] mb-6">No encontrada</h2>
        <p className="text-[var(--color-espuma-tenue)] max-w-md mb-8">
          Esta página no existe. Puede que el QR esté roto o que te hayas pasado de copas.
        </p>
        <Link href="/" className="btn-primary">
          VOLVER AL INICIO
        </Link>
      </main>

      <footer className="border-t border-[var(--border-subtle)] py-8 px-4 w-full">
        <div className="container mx-auto text-center text-sm text-[var(--color-espuma-tenue)]">
          <p>TAPEO — Amistad e irreverencia</p>
        </div>
      </footer>
    </div>
  );
}