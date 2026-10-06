import { MENU } from "@/data/menu";

export const ARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatPrice(amount) {
  if (typeof amount !== "number") return amount;
  return ARS.format(amount);
}

export const TAG_LABELS = {
  artesanal: "Artesanal",
  vegetariano: "Vegetariano",
  "sin-gluten": "Sin gluten",
  "sin-alcohol": "Sin alcohol",
  "amargor-alto": "Amargor alto",
  aperitivo: "Aperitivo",
  compartir: "Para compartir",
  agotado: "Agotado",
};

export function getTagClass(tag) {
  const map = {
    artesanal: "tag--artesanal",
    vegetariano: "tag--vegetariano",
    "sin-gluten": "tag--sin-gluten",
    "sin-alcohol": "tag--sin-alcohol",
    "amargor-alto": "tag--artesanal",
    aperitivo: "tag--artesanal",
    compartir: "tag--artesanal",
    agotado: "tag--agotado",
  };
  return map[tag] || "tag--artesanal";
}

export function getAllItems(menuType) {
  const menu = menuType === "comidas" ? MENU.comidas : MENU.bebidas;
  return menu.categories.flatMap((cat) => cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryLabel: cat.label })));
}

export function getItemById(menuType, id) {
  const items = getAllItems(menuType);
  return items.find((item) => item.id === id);
}

export { MENU };