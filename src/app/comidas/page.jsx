import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

const comidasMenu = [
  {
    category: "ENTRADAS",
    items: [
      {
        name: "Tabla de Quesos y Fiambres",
        description:
          "Selección de quesos y fiambres artesanales con frutos secos",
        price: "$1800",
      },
      {
        name: "Hummus de Garbanzos",
        description: "Con pimentón ahumado, aceite de oliva y pan pita",
        price: "$950",
      },
      {
        name: "Croquetas de Jamón",
        description: "Hechas en casa con bechamel cremosa",
        price: "$1200",
      },
      {
        name: "Provoleta Grillada",
        description: "Con chimichurri y tostadas",
        price: "$850",
      },
    ],
  },
  {
    category: "PLATOS PRINCIPALES",
    items: [
      {
        name: "Burger Clásica",
        description: "Carne 200g, queso cheddar, bacon, lechuga y papas",
        price: "$2200",
      },
      {
        name: "Salmón Grillado",
        description: "Con quinoa, vegetales asados y salsa de hierbas",
        price: "$2800",
      },
      {
        name: "Risotto de Hongos",
        description: "Con parmesano, trufa y rúcula",
        price: "$2400",
      },
      {
        name: "Lomo al Malbec",
        description: "Con puré de papas y verduras grilladas",
        price: "$3200",
      },
    ],
  },
  {
    category: "PIZZAS ARTESANALES",
    items: [
      {
        name: "Margherita",
        description: "Salsa de tomate, mozzarella fresca y albahaca",
        price: "$1600",
      },
      {
        name: "Quattro Formaggi",
        description: "Cuatro quesos con miel y nueces",
        price: "$1900",
      },
      {
        name: "Prosciutto e Funghi",
        description: "Jamón crudo, hongos y rúcula",
        price: "$2100",
      },
      {
        name: "Especial",
        description: "Calabaza asada, queso de cabra y panceta",
        price: "$2200",
      },
    ],
  },
  {
    category: "POSTRES",
    items: [
      {
        name: "Tiramisú de la Casa",
        description: "Clásico italiano con café y mascarpone",
        price: "$750",
      },
      {
        name: "Brownie con Helado",
        description: "Con salsa de dulce de leche y nueces",
        price: "$650",
      },
      {
        name: "Flan Casero",
        description: "Con dulce de leche y crema chantilly",
        price: "$550",
      },
      {
        name: "Cheesecake de Frutos Rojos",
        description: "Base de galletas y coulis de frutas",
        price: "$800",
      },
    ],
  },
];

export default function Comidas() {
  return (
    <div className="min-h-screen bg-temple">
      {/* Navigation */}
      <Navigation currentPage="comidas" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-temple-dark mb-8 fade-in-up">
            COMIDAS
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
            Sabores únicos que celebran la amistad y la irreverencia en cada
            bocado
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {comidasMenu.map((category, categoryIndex) => (
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
          <Link href="/bebidas" className="fondo-irregular temple-action-btn">
            VER BEBIDAS
          </Link>
        </div>
      </main>
    </div>
  );
}
