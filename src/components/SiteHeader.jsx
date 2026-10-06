"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "INICIO", key: "inicio" },
  { href: "/bebidas", label: "BEBIDAS", key: "bebidas" },
  { href: "/comidas", label: "COMIDAS", key: "comidas" },
];

export default function SiteHeader({ currentPage = "inicio", tableNumber = null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="border-b border-[var(--border-subtle)] bg-[var(--color-carbon)]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2 z-20 relative" aria-label="TAPEO - Inicio">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10"
                aria-hidden="true"
              />
              <span className="font-[var(--font-anton)] text-xl tracking-wide">TAPEO</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`font-[var(--font-archivo)] text-sm tracking-wider transition-colors duration-160 ${currentPage === item.key
                    ? "text-[var(--color-ambar)]"
                    : "text-[var(--color-espuma-tenue)] hover:text-[var(--color-espuma)]"
                    }`}
                  aria-current={currentPage === item.key ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {tableNumber && (
              <div className="hidden md:block" aria-label={`Mesa ${tableNumber}`}>
                <span className="table-chip">MESA {tableNumber}</span>
              </div>
            )}

            <button
              onClick={toggleMenu}
              className="md:hidden z-20 p-2 text-[var(--color-espuma)] hover:text-[var(--color-ambar)] transition-colors duration-160"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-[var(--color-carbon)] z-[60] transition-all duration-300 ease-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border-subtle)]">
          <Link href="/" onClick={toggleMenu} className="flex items-center gap-2" aria-label="TAPEO - Inicio">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="w-10 h-10"
              aria-hidden="true"
            />
            <span className="font-[var(--font-anton)] text-xl tracking-wide">TAPEO</span>
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 text-[var(--color-espuma-tenue)] hover:text-[var(--color-ambar)] transition-colors duration-160"
            aria-label="Cerrar menú"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100dvh-73px)] space-y-8 px-6">
          <nav className="flex flex-col items-center space-y-6" aria-label="Navegación móvil">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={toggleMenu}
                className={`font-[var(--font-anton)] text-3xl tracking-wide transition-colors duration-160 ${currentPage === item.key
                  ? "text-[var(--color-ambar)]"
                  : "text-[var(--color-espuma)] hover:text-[var(--color-ambar)]"
                  }`}
                aria-current={currentPage === item.key ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {tableNumber && (
            <span className="table-chip mt-4" aria-label={`Mesa ${tableNumber}`}>
              MESA {tableNumber}
            </span>
          )}
        </div>
      </div>
    </>
  );
}