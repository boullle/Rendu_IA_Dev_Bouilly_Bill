import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/tickets"; // Assure-toi que la route backend est correcte

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Récupérer tous les tickets
  const fetchTickets = async () => {
    try {
      const res = await axios.get(API_URL);
      setTickets(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors du chargement des tickets");
    }
  };

  // Création / mise à jour d’un ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setMessage("✔ Ticket mis à jour !");
      } else {
        await axios.post(API_URL, form);
        setMessage("✔ Ticket créé !");
      }
      setForm({ title: "", description: "", status: "" });
      setEditingId(null);
      fetchTickets();
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l’enregistrement");
    }
  };

  // Préparer le formulaire pour modifier un ticket
  const handleEdit = (ticket) => {
    setForm({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status
    });
    setEditingId(ticket.id);
  };

  // Supprimer un ticket
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce ticket ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("🗑 Ticket supprimé !");
      fetchTickets();
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Tickets</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          placeholder="Statut"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? "Mettre à jour" : "Créer"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", description: "", status: "" });
            }}
          >
            Annuler
          </button>
        )}
      </form>

      <ul>
        {tickets.map((t) => (
          <li key={t.id}>
            <strong>{t.title}</strong> — {t.description} — Statut: {t.status}
            <button onClick={() => handleEdit(t)}>✏ Modifier</button>
            <button onClick={() => handleDelete(t.id)}>🗑 Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
