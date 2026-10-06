import MenuItemRow from "./MenuItemRow";

export default function CategorySection({ category }) {
  return (
    <section className="category-section" aria-labelledby={`${category.id}-title`}>
      <header className="mb-6">
        <p className="section-kicker">{category.kicker}</p>
        <h2 id={`${category.id}-title`} className="section-title">
          {category.label}
        </h2>
      </header>
      <div className="space-y-0">
        {category.items.map((item) => (
          <MenuItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}