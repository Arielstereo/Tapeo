import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-carbon)]">
      <SiteHeader currentPage="inicio" />

      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover blur-sm opacity-80"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[var(--color-carbon)]/60" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-center py-16 md:py-24 px-6 lg:mx-32">
            <div className="lg:w-1/3">
              <h1 className="hero-title mb-6">TAPEO</h1>
              <p className="hero-subtitle max-w-lg mb-10">
                Somos amistad e irreverencia, un culto y una cerveza. No somos otra cervecería.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/comidas" className="btn-primary text-center">
                  COMIDAS
                </Link>
                <Link href="/bebidas" className="btn-primary text-center bg-transparent border-2 border-[var(--color-ambar)] text-[var(--color-ambar)] hover:bg-[var(--color-ambar)] hover:text-[var(--color-carbon)]">
                  BEBIDAS
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 mt-10 lg:mt-0 relative aspect-[4/3] lg:aspect-[16/10] flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo de TAPEO"
                width={400}
                height={400}
                className="object-contain max-h-full"
                priority
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 text-center border-t border-[var(--border-subtle)] pt-12">
          <p className="text-[var(--color-espuma-tenue)] text-lg mb-4">Seguinos en</p>
          <div className="flex justify-center items-center gap-3">
            <span className="font-[var(--font-mono)] text-sm text-[var(--color-ambar)]">@Tapeo_arg</span>
            <Link
              href="https://www.instagram.com/TapeoArg/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-subtle)] hover:border-[var(--color-ambar)] hover:text-[var(--color-ambar)] transition-colors duration-160"
              aria-label="Instagram de TAPEO"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--border-subtle)] py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-espuma-tenue)]">
          <p>TAPEO — Amistad e irreverencia</p>
          <p className="font-[var(--font-mono)]">Av. Siempre Viva 742, CABA</p>
        </div>
      </footer>
    </div>
  );
}