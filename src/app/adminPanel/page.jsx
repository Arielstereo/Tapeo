"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Trash2, Plus, Save, X } from "lucide-react";
import { formatPrice, TAG_LABELS, MENU, getTagClass } from "@/lib/format";
import SiteHeader from "@/components/SiteHeader";

const STORAGE_KEY = "tapeo_admin_menu";
const PASSWORD = "tapeo123";

const INITIAL_MENU = {
  comidas: MENU.comidas.categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryLabel: cat.label }))
  ),
  bebidas: MENU.bebidas.categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryLabel: cat.label }))
  ),
};

function loadFromStorage() {
  if (typeof window === "undefined") return INITIAL_MENU;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return INITIAL_MENU;
}

function saveToStorage(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function AdminPanel() {
  const [autenticado, setAutenticado] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [menuData, setMenuData] = useState(() => loadFromStorage());
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    menuType: "comidas",
    tags: [],
    image: "",
    available: true,
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMenuData(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleLogin = () => {
    if (inputPass === PASSWORD) {
      setAutenticado(true);
      setError("");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    setAutenticado(false);
    setInputPass("");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      menuType: "comidas",
      tags: [],
      image: "",
      available: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      categoryId: formData.categoryId,
      menuType: formData.menuType,
      tags: formData.tags.filter(Boolean),
      image: formData.image || `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop`,
      available: formData.available,
    };

    setMenuData((prev) => {
      const updated = {
        comidas: [...prev.comidas],
        bebidas: [...prev.bebidas],
      };
      const arr = updated[formData.menuType];
      if (editingId) {
        const idx = arr.findIndex((i) => i.id === editingId);
        if (idx >= 0) arr[idx] = newItem;
      } else {
        arr.push(newItem);
      }
      saveToStorage(updated);
      return updated;
    });
    resetForm();
  };

  const handleDelete = (menuType, id) => {
    if (!confirm("¿Eliminar este item?")) return;
    setMenuData((prev) => {
      const updated = {
        comidas: prev.comidas.filter((i) => i.id !== id),
        bebidas: prev.bebidas.filter((i) => i.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const handleEdit = (item, menuType) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      categoryId: item.categoryId,
      menuType,
      tags: [...item.tags],
      image: item.image,
      available: item.available,
    });
    setShowForm(true);
  };

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-[var(--color-carbon)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-[var(--color-brea)] border border-[var(--border-subtle)] p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-[var(--font-anton)] text-3xl tracking-wide">TAPEO</span>
              <span className="text-[var(--color-espuma-tenue)] text-sm">ADMIN</span>
            </div>
            <h1 className="font-[var(--font-anton)] text-2xl mb-6">Acceso al Panel</h1>
            <p className="text-[var(--color-espuma-tenue)] text-sm mb-6">
              ⚠️ Prototipo: autenticación solo en cliente. No usar en producción.
            </p>
            <div className="relative mb-4">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Contraseña"
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 bg-[var(--color-carbon)] border border-[var(--border-subtle)] focus:border-[var(--color-ambar)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ambar)] text-[var(--color-espuma)] placeholder-[var(--color-espuma-tenue)] pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-espuma-tenue)] hover:text-[var(--color-ambar)] transition-colors"
                aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="btn-primary w-full py-3"
              disabled={!inputPass}
            >
              Ingresar
            </button>
            {error && <p className="text-[var(--color-lacra)] text-sm mt-4 text-center">{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  const allItems = [...menuData.comidas, ...menuData.bebidas];

  return (
    <div className="min-h-screen bg-[var(--color-carbon)]">
      <SiteHeader currentPage="admin" />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="section-kicker">ADMIN</p>
            <h1 className="font-[var(--font-anton)] text-3xl">Panel de Administración</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                resetForm();
              }}
              className="btn-primary"
            >
              <Plus size={18} className="inline mr-2" /> Nuevo Item
            </button>
            <button
              onClick={handleLogout}
              className="btn-primary bg-transparent border-2 border-[var(--color-espuma-tenue)] text-[var(--color-espuma-tenue)] hover:border-[var(--color-lacra)] hover:text-[var(--color-lacra)]"
            >
              <X size={18} className="inline mr-2" /> Salir
            </button>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[var(--color-brea)] border border-[var(--border-subtle)] p-6 mb-8 space-y-4" aria-label={editingId ? "Editar item" : "Nuevo item"}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="menuType" className="block text-sm text-[var(--color-espuma-tenue)] mb-1">
                  Tipo de carta
                </label>
                <select
                  id="menuType"
                  value={formData.menuType}
                  onChange={(e) => setFormData({ ...formData, menuType: e.target.value, categoryId: "" })}
                  className="w-full px-4 py-3 bg-[var(--color-carbon)] border border-[var(--border-subtle)] focus:border-[var(--color-ambar)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ambar)] text-[var(--color-espuma)]"
                >
                  <option value="comidas">Comidas</option>
                  <option value="bebidas">Bebidas</option>
                </select>
              </div>
              <div>
                <label htmlFor="categoryId" className="block text-sm text-[var(--color-espuma-tenue)] mb-1">
                  Categoría
                </label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-carbon)] border border-[var(--border-subtle)] focus:border-[var(--color-ambar)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ambar)] text-[var(--color-espuma)]"
                >
                  <option value="">Seleccionar categoría</option>
                  {MENU[formData.menuType].categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm text-[var(--color-espuma-tenue)] mb-1">
                Nombre *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--color-carbon)] border border-[var(--border-subtle)] focus:border-[var(--color-ambar)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ambar)] text-[var(--color-espuma)] placeholder-[var(--color-espuma-tenue)]"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm text-[var(--color-espuma-tenue)] mb-1">
                Descripción *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-[var(--color-carbon)] border border-[var(--border-subtle)] focus:border-[var(--color-ambar)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ambar)] text-[var(--color-espuma)] placeholder-[var(--color-espuma-tenue)] resize-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm text-[var(--color-espuma-tenue)] mb-1">
                  Precio (ARS) *
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="50"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-carbon)] border border-[var(--border-subtle)] focus:border-[var(--color-ambar)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ambar)] text-[var(--color-espuma)] font-[var(--font-mono)]"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm text-[var(--color-espuma-tenue)] mb-1">
                  URL de imagen
                </label>
                <input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-carbon)] border border-[var(--border-subtle)] focus:border-[var(--color-ambar)] focus:outline-none focus:ring-1 focus:ring-[var(--color-ambar)] text-[var(--color-espuma)] placeholder-[var(--color-espuma-tenue)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[var(--color-espuma-tenue)] mb-2">Etiquetas</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(TAG_LABELS).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`tag transition-colors ${formData.tags.includes(tag) ? getTagClass(tag) : "bg-[var(--color-carbon)] border border-[var(--border-subtle)] text-[var(--color-espuma-tenue)] hover:border-[var(--color-ambar)]"}`}
                  >
                    {TAG_LABELS[tag]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="w-4 h-4 accent-[var(--color-ambar)] border-[var(--border-subtle)] bg-[var(--color-carbon)]"
                />
                <span className="text-sm text-[var(--color-espuma)]">Disponible</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1">
                <Save size={18} className="inline mr-2" />
                {editingId ? "Guardar cambios" : "Agregar item"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-primary bg-transparent border-2 border-[var(--color-espuma-tenue)] text-[var(--color-espuma-tenue)] hover:border-[var(--color-lacra)] hover:text-[var(--color-lacra)] flex-1"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        )}

        <div className="bg-[var(--color-brea)] border border-[var(--border-subtle)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] bg-[var(--color-carbon)]">
                  <th className="text-left px-4 py-3 font-[var(--font-archivo)] text-sm text-[var(--color-espuma-tenue)] uppercase tracking-wider">Item</th>
                  <th className="text-left px-4 py-3 font-[var(--font-archivo)] text-sm text-[var(--color-espuma-tenue)] uppercase tracking-wider hidden md:table-cell">Categoría</th>
                  <th className="text-left px-4 py-3 font-[var(--font-archivo)] text-sm text-[var(--color-espuma-tenue)] uppercase tracking-wider hidden lg:table-cell">Tipo</th>
                  <th className="text-right px-4 py-3 font-[var(--font-archivo)] text-sm text-[var(--color-espuma-tenue)] uppercase tracking-wider font-[var(--font-mono)]">Precio</th>
                  <th className="text-center px-4 py-3 font-[var(--font-archivo)] text-sm text-[var(--color-espuma-tenue)] uppercase tracking-wider">Estado</th>
                  <th className="text-right px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {allItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-[var(--color-espuma-tenue)]">
                      No hay items. Agregá el primero.
                    </td>
                  </tr>
                )}
                {allItems.map((item) => (
                  <tr key={item.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--color-carbon)]/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-[var(--color-espuma)]">{item.name}</div>
                      <div className="text-sm text-[var(--color-espuma-tenue)] truncate max-w-xs">{item.description}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className={`tag text-xs ${getTagClass(tag)}`}>
                            {TAG_LABELS[tag] || tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-sm text-[var(--color-espuma-tenue)]">
                      {item.categoryLabel}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-sm text-[var(--color-espuma-tenue)]">
                      {item.menuType === "comidas" ? "🍽️ Comidas" : "🍺 Bebidas"}
                    </td>
                    <td className="px-4 py-3 text-right font-[var(--font-mono)] text-[var(--color-ambar)]">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`tag text-xs ${item.available ? "tag--artesanal" : "tag--agotado"}`}>
                        {item.available ? "Disponible" : "Agotado"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item, item.menuType)}
                          className="p-2 text-[var(--color-espuma-tenue)] hover:text-[var(--color-ambar)] transition-colors"
                          aria-label={`Editar ${item.name}`}
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.menuType, item.id)}
                          className="p-2 text-[var(--color-espuma-tenue)] hover:text-[var(--color-lacra)] transition-colors"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}