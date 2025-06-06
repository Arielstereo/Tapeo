"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// interface NavigationProps {
//   currentPage?: 'inicio' | 'bebidas' | 'comidas'
// }

export default function Navigation({ currentPage = "inicio" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "/", label: "INICIO", key: "inicio" },
    { href: "/bebidas", label: "BEBIDAS", key: "bebidas" },
    { href: "/comidas", label: "COMIDAS", key: "comidas" },
  ];

  return (
    <nav className="bg-temple border-b border-gray-200 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex justify-center items-center gap-2 z-20 relative"
          >
            <Image
              src="/logo.png"
              alt="Temple"
              width={20}
              height={20}
              className="w-12 h-12"
            />
            <span className="text-lg">TAPEO</span>
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-temple-dark text-base hover:text-gray-600 transition-colors duration-200 ${
                  currentPage === item.key ? "font-bold" : "font-normal"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          {!isMenuOpen && (
            <button
              onClick={toggleMenu}
              className="md:hidden z-20 relative p-2 text-temple-dark hover:text-gray-600 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu size={36} />
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-30 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Botón X dentro del overlay */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 z-40 p-2 text-temple-dark hover:text-gray-600 transition-colors duration-200"
            aria-label="Cerrar menú"
          >
            <X size={32} />
          </button>
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {/* Logo */}

            <Image
              src="/logo.png"
              alt="Temple"
              width={20}
              height={20}
              className="w-16 h-16"
            />
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-temple-dark text-2xl hover:text-gray-600 transition-colors duration-200 ${
                  currentPage === item.key ? "font-bold" : "font-normal"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
