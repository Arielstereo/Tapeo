import { Metadata } from "next";
import { MENU } from "@/data/menu";
import SiteHeader from "@/components/SiteHeader";
import CategorySection from "@/components/CategorySection";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { n } = await params;
  const tableNumber = n;

  return {
    title: `Mesa ${tableNumber} | TAPEO`,
    description: `Menú para la mesa ${tableNumber} en TAPEO. Somos amistad e irreverencia, un culto y una cerveza.`,
    openGraph: {
      title: `Mesa ${tableNumber} | TAPEO`,
      description: `Menú para la mesa ${tableNumber} en TAPEO.`,
      type: "website",
      locale: "es_AR",
      siteName: "TAPEO",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function MesaPage({ params }) {
  const { n } = await params;
  const tableNumber = n;

  return (
    <div className="min-h-screen bg-[var(--color-carbon)]">
      <SiteHeader currentPage="mesa" tableNumber={tableNumber} />

      <main className="container mx-auto px-4 py-12">
        <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="section-kicker">TU MESA</p>
            <h1 className="hero-title text-3xl md:text-4xl">Mesa {tableNumber}</h1>
          </div>
          <nav className="flex gap-4" aria-label="Navegación entre secciones">
            <Link href={`/comidas?t=${tableNumber}`} className="btn-primary">
              COMIDAS
            </Link>
            <Link href={`/bebidas?t=${tableNumber}`} className="btn-primary bg-transparent border-2 border-[var(--color-ambar)] text-[var(--color-ambar)] hover:bg-[var(--color-ambar)] hover:text-[var(--color-carbon)]">
              BEBIDAS
            </Link>
          </nav>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          <section aria-labelledby="comidas-title">
            <header className="mb-6">
              <p className="section-kicker">{MENU.comidas.kicker}</p>
              <h2 id="comidas-title" className="section-title">
                {MENU.comidas.title}
              </h2>
              <p className="text-[var(--color-espuma-tenue)] mt-2 max-w-xl">
                {MENU.comidas.intro}
              </p>
            </header>
            <div className="space-y-6">
              {MENU.comidas.categories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href={`/bebidas?t=${tableNumber}`} className="btn-primary">
                VER BEBIDAS
              </Link>
            </div>
          </section>

          <section aria-labelledby="bebidas-title">
            <header className="mb-6">
              <p className="section-kicker">{MENU.bebidas.kicker}</p>
              <h2 id="bebidas-title" className="section-title">
                {MENU.bebidas.title}
              </h2>
              <p className="text-[var(--color-espuma-tenue)] mt-2 max-w-xl">
                {MENU.bebidas.intro}
              </p>
            </header>
            <div className="space-y-6">
              {MENU.bebidas.categories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href={`/comidas?t=${tableNumber}`} className="btn-primary">
                VER COMIDAS
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-[var(--border-subtle)] py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-espuma-tenue)]">
          <p>TAPEO — Mesa {tableNumber}</p>
          <p className="font-[var(--font-mono)]">Escaneá el QR para volver al menú</p>
        </div>
      </footer>
    </div>
  );
}