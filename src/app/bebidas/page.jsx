import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

const bebidasMenu = [
  {
    category: "CERVEZAS ARTESANALES",
    items: [
      {
        name: "Temple IPA",
        description: "Cerveza India Pale Ale con lúpulos americanos",
        price: "$850",
      },
      {
        name: "Temple Lager",
        description: "Cerveza rubia clásica, refrescante y equilibrada",
        price: "$750",
      },
      {
        name: "Temple Stout",
        description: "Cerveza negra con notas de café y chocolate",
        price: "$900",
      },
      {
        name: "Temple Wheat",
        description: "Cerveza de trigo con toque cítrico",
        price: "$800",
      },
    ],
  },
  {
    category: "CÓCTELES DE AUTOR",
    items: [
      {
        name: "Temple Mule",
        description: "Vodka, jengibre, lima y menta",
        price: "$1200",
      },
      {
        name: "Sacred Gin Tonic",
        description: "Gin premium con tónicas especiales",
        price: "$1350",
      },
      {
        name: "Old Temple",
        description: "Whisky añejo, bitter y almíbar",
        price: "$1500",
      },
      {
        name: "Divine Spritz",
        description: "Aperol, prosecco y naranja",
        price: "$1100",
      },
    ],
  },
  {
    category: "VINOS SELECCIONADOS",
    items: [
      {
        name: "Malbec Reserva",
        description: "Vino tinto de Mendoza, cosecha especial",
        price: "$2200",
      },
      {
        name: "Chardonnay",
        description: "Vino blanco fresco y aromático",
        price: "$1900",
      },
      {
        name: "Cabernet Sauvignon",
        description: "Vino tinto con cuerpo y carácter",
        price: "$2400",
      },
      {
        name: "Torrontés",
        description: "Vino blanco dulce y floral",
        price: "$1800",
      },
    ],
  },
  {
    category: "SIN ALCOHOL",
    items: [
      {
        name: "Limonada de Jengibre",
        description: "Refrescante con miel y menta",
        price: "$650",
      },
      {
        name: "Agua Saborizada",
        description: "Con frutas de estación",
        price: "$550",
      },
      { name: "Café Especial", description: "Blend de la casa", price: "$450" },
      {
        name: "Té Chai Latte",
        description: "Con leche vegetal disponible",
        price: "$600",
      },
    ],
  },
];

export default function Bebidas() {
  return (
    <div className="min-h-screen bg-temple">
      {/* Navigation */}
      <Navigation currentPage="bebidas" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-temple-dark mb-8 fade-in-up">
            BEBIDAS
          </h1>
          <div className="flex justify-center mb-8">
            <div className="temple-logo-container">
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={150}
                className="w-32 h-32 temple-main-logo"
              />
            </div>
          </div>
          <p className="text-temple-dark text-lg max-w-2xl mx-auto fade-in-up">
            Descubre nuestra selección de bebidas cuidadosamente elegidas para
            acompañar cada momento
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {bebidasMenu.map((category, categoryIndex) => (
            <div key={category.category} className="menu-category">
              <h2 className="text-2xl font-bold text-temple-dark mb-6 text-center">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={`${category.category}-${item.name}`}
                    className="menu-item"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-temple-dark mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className="text-lg font-bold text-temple-dark">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link href="/comidas" className="fondo-irregular temple-action-btn">
            VER COMIDAS
          </Link>
        </div>
      </main>
    </div>
  );
}
