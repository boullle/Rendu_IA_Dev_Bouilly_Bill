// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:3000/products";

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: "", price: 0, stock: 0 });

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(API_URL, form);
//       setForm({ name: "", price: 0, stock: 0 });
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Supprimer ce produit ?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { fetchProducts(); }, []);

//   return (
//     <div style={{ marginBottom: "40px" }}>
//       <h2>Products</h2>
//       <form onSubmit={handleSubmit}>
//         <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//         <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required />
//         <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })} required />
//         <button type="submit">Create</button>
//       </form>
//       <ul>
//         {products.map(p => (
//           <li key={p.id}>{p.name} - ${p.price} - Stock: {p.stock} <button onClick={() => handleDelete(p.id)}>Delete</button></li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProductList;


import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: 0, stock: 0 });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      setMessage("❌ Erreur lors de la récupération des produits");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setMessage("✔ Produit mis à jour !");
      } else {
        await axios.post(API_URL, form);
        setMessage("✔ Produit créé !");
      }

      setForm({ name: "", price: 0, stock: 0 });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setMessage("❌ Erreur lors de l'enregistrement !");
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("🗑 Produit supprimé !");
      fetchProducts();
    } catch (err) {
      setMessage("❌ Erreur lors de la suppression !");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Products</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: parseFloat(e.target.value) })
          }
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: parseInt(e.target.value) })
          }
          required
        />
        <button type="submit">
          {editingId ? "Mettre à jour" : "Créer"}
        </button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setForm({ name: "", price: 0, stock: 0 });
          }}>
            Annuler
          </button>
        )}
      </form>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} — {p.price} € — Stock : {p.stock}
            <button onClick={() => handleEdit(p)}>✏ Modifier</button>
            <button onClick={() => handleDelete(p._id)}>🗑 Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
