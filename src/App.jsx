import React, { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "techInventory";
const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=6";

const CATEGORIES = ["Periféricos", "Componentes", "Redes", "Almacenamiento", "Software", "Otros"];

function sanitizeInput(value) {
  if (typeof value !== "string") return value;
  return value
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/`/g, "&#x60;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

function mapPostsToInventory(posts) {
  return posts.map((post, index) => ({
    id: Date.now() + index,
    nombre: sanitizeInput(post.title.substring(0, 40)),
    descripcion: sanitizeInput(post.body.substring(0, 90)),
    categoria: CATEGORIES[index % CATEGORIES.length],
    stock: Math.floor(Math.random() * 50) + 1,
    precio: Math.floor(Math.random() * 90000) + 5000,
  }));
}

const EMPTY_FORM = {
  id: null,
  nombre: "",
  descripcion: "",
  categoria: CATEGORIES[0],
  stock: "",
  precio: "",
};

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    async function loadInventory() {
      setLoading(true);
      setError(null);
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (stored) {
          try {
            setItems(JSON.parse(stored));
            setLoading(false);
            return;
          } catch (parseErr) {
            console.warn("LocalStorage parse error, will reload from API", parseErr);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        }

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Error HTTP ${response.status}: no se pudo obtener el inventario inicial`);
        }

        const posts = await response.json();
        const initialInventory = mapPostsToInventory(posts);

        setItems(initialInventory);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialInventory));
      } catch (err) {
        console.error("Error al cargar el inventario:", err);
        setError(
          err.message === "Failed to fetch"
            ? "No se pudo conectar con el servidor. Verifica tu conexión a internet."
            : err.message || "Ocurrió un error inesperado al cargar el inventario."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  function persist(updatedItems) {
    setItems(updatedItems);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedItems));
  }

  function showFeedback(message, type = "success") {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 2500);
  }

  function validateForm(data) {
    const errors = {};

    if (!data.nombre || data.nombre.trim().length === 0) {
      errors.nombre = "El nombre del insumo es obligatorio.";
    } else if (data.nombre.trim().length < 3) {
      errors.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!data.descripcion || data.descripcion.trim().length === 0) {
      errors.descripcion = "La descripción es obligatoria.";
    }

    if (data.stock === "" || data.stock === null || isNaN(Number(data.stock))) {
      errors.stock = "Ingresa una cantidad de stock válida.";
    } else if (Number(data.stock) < 0) {
      errors.stock = "El stock no puede ser negativo.";
    }

    if (data.precio === "" || data.precio === null || isNaN(Number(data.precio))) {
      errors.precio = "Ingresa un precio válido.";
    } else if (Number(data.precio) < 0) {
      errors.precio = "El precio no puede ser negativo.";
    }

    return errors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const sanitizedItem = {
      id: isEditing ? form.id : Date.now(),
      nombre: sanitizeInput(form.nombre),
      descripcion: sanitizeInput(form.descripcion),
      categoria: sanitizeInput(form.categoria),
      stock: Number(form.stock),
      precio: Number(form.precio),
    };

    if (isEditing) {
      const updated = items.map((item) => (item.id === sanitizedItem.id ? sanitizedItem : item));
      persist(updated);
      showFeedback("Insumo actualizado correctamente.", "warning");
    } else {
      const updated = [sanitizedItem, ...items];
      persist(updated);
      showFeedback("Insumo agregado correctamente.", "success");
    }

    resetForm();
  }

  function editItem(item) {
    setForm({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      categoria: item.categoria,
      stock: String(item.stock),
      precio: String(item.precio),
    });
    setIsEditing(true);
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteItem(id) {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este insumo? Esta acción no se puede deshacer.");
    if (!confirmed) return;

    const updated = items.filter((item) => item.id !== id);
    persist(updated);
    showFeedback("Insumo eliminado.", "danger");

    if (isEditing && form.id === id) {
      resetForm();
    }
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setIsEditing(false);
    setFormErrors({});
  }

  function handleReloadFromApi() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.reload();
  }

  const totalStock = items.reduce((sum, item) => sum + Number(item.stock || 0), 0);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="ts-hero">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="ts-icon-chip">
                <i className="bi bi-boxes"></i>
              </div>
              <div>
                <h1 className="h3 mb-0">TechStock Pro</h1>
                <p className="mb-0 small opacity-75">Gestión de Bodega Tecnológica</p>
              </div>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge-yellow">
                <i className="bi bi-box-seam me-1"></i>
                {items.length} insumos
              </span>
              <span className="badge-yellow">
                <i className="bi bi-graph-up me-1"></i>
                {totalStock} unidades en stock
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container flex-grow-1 py-4">
        {feedback && (
          <div className={`alert alert-${feedback.type} shadow-sm`} role="alert">
            <i className="bi bi-check-circle me-2"></i>
            {feedback.message}
          </div>
        )}

        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="ts-form-card">
              {isEditing && (
                <div className="ts-editing-banner mb-3">
                  <i className="bi bi-pencil-square me-2"></i>
                  Editando insumo existente
                </div>
              )}

              <h5 className="mb-3">
                <i className={`bi ${isEditing ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>
                {isEditing ? "Editar insumo" : "Nuevo insumo"}
              </h5>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className={`form-control ${formErrors.nombre ? "is-invalid" : ""}`}
                    placeholder="Ej: Mouse inalámbrico Logitech"
                    value={form.nombre}
                    onChange={handleChange}
                  />
                  {formErrors.nombre && <div className="text-danger small mt-1">{formErrors.nombre}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Descripción</label>
                  <textarea
                    name="descripcion"
                    className={`form-control ${formErrors.descripcion ? "is-invalid" : ""}`}
                    placeholder="Detalle breve del insumo"
                    rows="3"
                    value={form.descripcion}
                    onChange={handleChange}
                  ></textarea>
                  {formErrors.descripcion && <div className="text-danger small mt-1">{formErrors.descripcion}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Categoría</label>
                  <select name="categoria" className="form-select" value={form.categoria} onChange={handleChange}>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      className={`form-control ${formErrors.stock ? "is-invalid" : ""}`}
                      placeholder="0"
                      min="0"
                      value={form.stock}
                      onChange={handleChange}
                    />
                    {formErrors.stock && <div className="text-danger small mt-1">{formErrors.stock}</div>}
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold">Precio ($)</label>
                    <input
                      type="number"
                      name="precio"
                      className={`form-control ${formErrors.precio ? "is-invalid" : ""}`}
                      placeholder="0"
                      min="0"
                      value={form.precio}
                      onChange={handleChange}
                    />
                    {formErrors.precio && <div className="text-danger small mt-1">{formErrors.precio}</div>}
                  </div>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="submit"
                    className={isEditing ? "btn-ts-warning" : "btn-ts-primary"}
                  >
                    <i className={`bi ${isEditing ? "bi-check2-circle" : "bi-plus-lg"} me-1`}></i>
                    {isEditing ? "Guardar cambios" : "Agregar insumo"}
                  </button>

                  {isEditing && (
                    <button type="button" className="btn-ts-outline" onClick={resetForm}>
                      <i className="bi bi-x-lg me-1"></i>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
              <h2 className="h5 ts-section-title mb-0">Inventario actual</h2>
              <button className="btn-ts-outline btn-sm" onClick={handleReloadFromApi} title="Restablece el inventario desde la API">
                <i className="bi bi-arrow-repeat me-1"></i>
                Restablecer desde API
              </button>
            </div>

            {loading && (
              <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <div className="spinner-border ts-spinner mb-3" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="text-muted">Cargando inventario...</p>
              </div>
            )}

            {!loading && error && (
              <div className="ts-alert-error p-3 d-flex align-items-start gap-2">
                <i className="bi bi-exclamation-triangle-fill fs-4"></i>
                <div>
                  <strong>No se pudo cargar el inventario.</strong>
                  <div className="small">{error}</div>
                </div>
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="ts-empty-state">
                <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                No hay insumos registrados todavía. Agrega el primero usando el formulario.
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <div className="row g-3">
                {items.map((item) => (
                  <div className="col-12 col-md-6" key={item.id}>
                    <div className="ts-card p-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="card-title h6 mb-0">{item.nombre}</h3>
                        <span className="ts-stock-badge">
                          <i className="bi bi-boxes me-1"></i>
                          {item.stock}
                        </span>
                      </div>
                      <p className="text-muted small mb-2">{item.descripcion}</p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-light text-dark border">{item.categoria}</span>
                        <span className="ts-price">${Number(item.precio).toLocaleString("es-CL")}</span>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn-ts-warning btn-sm flex-grow-1" onClick={() => editItem(item)}>
                          <i className="bi bi-pencil-square me-1"></i>
                          Editar
                        </button>
                        <button className="btn-ts-danger btn-sm flex-grow-1" onClick={() => deleteItem(item.id)}>
                          <i className="bi bi-trash3 me-1"></i>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center py-3 small text-muted border-top">
        TechStock Pro &copy; 2026 — Proyecto académico INACAP Maipú, Ingeniería Informática
      </footer>
    </div>
  );
}
