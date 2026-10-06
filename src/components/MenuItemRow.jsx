import { formatPrice, getTagClass, TAG_LABELS } from "@/lib/format";
import Image from "next/image";

export default function MenuItemRow({ item }) {
  if (!item.available) {
    return (
      <article className="menu-row opacity-50" aria-label={`${item.name} - Agotado`}>
        <div className="flex gap-4">
          {item.image && (
            <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-sm">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover grayscale"
                sizes="96px"
              />
            </div>
          )}
          <div className="menu-row__content">
            <h3 className="menu-row__name">{item.name}</h3>
            <p className="menu-row__desc">{item.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-2" aria-label="Etiquetas">
              {item.tags.map((tag) => (
                <span key={tag} className={`tag ${getTagClass(tag)}`}>
                  {TAG_LABELS[tag] || tag}
                </span>
              ))}
              <span className="tag tag--agotado">Agotado</span>
            </div>
          </div>
        </div>
        <span className="menu-row__price" aria-hidden="true">—</span>
      </article>
    );
  }

  return (
    <article className="menu-row" aria-label={`${item.name} - ${formatPrice(item.price)}`}>
      <div className="flex gap-4">
        {item.image && (
          <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-sm">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="96px"
              loading="lazy"
            />
          </div>
        )}
        <div className="menu-row__content leader-dots">
          <h3 className="menu-row__name">{item.name}</h3>
          <p className="menu-row__desc">{item.description}</p>
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2" aria-label="Etiquetas">
              {item.tags.map((tag) => (
                <span key={tag} className={`tag ${getTagClass(tag)}`}>
                  {TAG_LABELS[tag] || tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <span className="menu-row__price">{formatPrice(item.price)}</span>
    </article>
  );
}