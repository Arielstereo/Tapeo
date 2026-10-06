import { Metadata } from "next";
import { MENU } from "@/data/menu";
import SiteHeader from "@/components/SiteHeader";
import CategorySection from "@/components/CategorySection";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const tableNumber = params?.t;

  return {
    title: `COMIDAS${tableNumber ? ` — Mesa ${tableNumber}` : ""} | TAPEO`,
    description: tableNumber
      ? `Menú de comidas para la mesa ${tableNumber} en TAPEO.`
      : "Sabores únicos que celebran la amistad y la irreverencia en cada bocado",
    openGraph: {
      title: `COMIDAS${tableNumber ? ` — Mesa ${tableNumber}` : ""} | TAPEO`,
      description: tableNumber
        ? `Menú de comidas para la mesa ${tableNumber} en TAPEO.`
        : "Sabores únicos que celebran la amistad y la irreverencia en cada bocado",
      type: "website",
      locale: "es_AR",
      siteName: "TAPEO",
    },
    robots: {
      index: !tableNumber,
      follow: true,
    },
  };
}

export default async function ComidasPage({ searchParams }) {
  const params = await searchParams;
  const tableNumber = params?.t || null;

  return (
    <div className="min-h-screen bg-[var(--color-carbon)]">
      <SiteHeader currentPage="comidas" tableNumber={tableNumber} />

      <main className="container mx-auto px-4 py-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="section-kicker">{MENU.comidas.kicker}</p>
            <h1 className="hero-title text-3xl md:text-4xl">{MENU.comidas.title}</h1>
          </div>
          <nav className="flex gap-4" aria-label="Navegación">
            <Link href={`/bebidas${tableNumber ? `?t=${tableNumber}` : ""}`} className="btn-primary bg-transparent border-2 border-[var(--color-ambar)] text-[var(--color-ambar)] hover:bg-[var(--color-ambar)] hover:text-[var(--color-carbon)]">
              BEBIDAS
            </Link>
            {tableNumber && (
              <Link href={`/mesa/${tableNumber}`} className="btn-primary bg-transparent border-2 border-[var(--color-espuma-tenue)] text-[var(--color-espuma-tenue)] hover:border-[var(--color-espuma)] hover:text-[var(--color-espuma)]">
                MESA {tableNumber}
              </Link>
            )}
          </nav>
        </header>

        <p className="text-[var(--color-espuma-tenue)] mb-10 max-w-2xl">{MENU.comidas.intro}</p>

        <div className="space-y-10">
          {MENU.comidas.categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-16 text-center border-t border-[var(--border-subtle)] pt-8">
          <Link
            href={`/bebidas${tableNumber ? `?t=${tableNumber}` : ""}`}
            className="btn-primary"
          >
            VER BEBIDAS
          </Link>
        </div>
      </main>

      <footer className="border-t border-[var(--border-subtle)] py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-espuma-tenue)]">
          <p>TAPEO — {tableNumber ? `Mesa ${tableNumber}` : "Comidas"}</p>
          <p className="font-[var(--font-mono)]">Av. Siempre Viva 742, CABA</p>
        </div>
      </footer>
    </div>
  );
}