import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/projects";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Load all projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors du chargement des projets.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        alert("Projet mis à jour !");
      } else {
        await axios.post(API_URL, form);
        alert("Projet créé !");
      }
      setForm({ name: "", description: "" });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    }
  };

  const handleEdit = (project) => {
    setForm({ name: project.name, description: project.description });
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce projet ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Projects</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom du projet"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <button type="submit">
          {editingId ? "Mettre à jour" : "Créer"}
        </button>
      </form>

      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.name} - {p.description}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
