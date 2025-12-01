// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ModalForm from "./ModalForm";
// import Notification from "./Notification";

// const API_URL = "http://localhost:3000/tasks";

// function TaskList() {
//   const [tasks, setTasks] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [notification, setNotification] = useState({ message: "", type: "" });

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setTasks(res.data);
//     } catch (err) {
//       setNotification({ message: "Erreur lors du chargement des tâches", type: "error" });
//     }
//   };

//   const handleCreate = () => { setCurrentTask(null); setModalOpen(true); };
//   const handleEdit = (task) => { setCurrentTask(task); setModalOpen(true); };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Supprimer cette tâche ?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setNotification({ message: "Tâche supprimée", type: "success" });
//       fetchTasks();
//     } catch (err) {
//       setNotification({ message: "Erreur lors de la suppression", type: "error" });
//     }
//   };

//   const handleSubmit = async (data) => {
//     try {
//       if (currentTask) await axios.put(`${API_URL}/${currentTask.id}`, data);
//       else await axios.post(API_URL, data);
//       setNotification({ message: currentTask ? "Tâche mise à jour" : "Tâche créée", type: "success" });
//       setModalOpen(false);
//       fetchTasks();
//     } catch (err) {
//       setNotification({ message: err.response?.data?.error || "Erreur lors de l'opération", type: "error" });
//     }
//   };

//   useEffect(() => { fetchTasks(); }, []);

//   return (
//     <div style={{ marginBottom: "40px" }}>
//       <h2>Tasks</h2>
//       <button onClick={handleCreate}>Create New Task</button>
//       <Notification message={notification.message} type={notification.type} onClose={() => setNotification({})} />
//       <ul>
//         {tasks.map(t => (
//           <li key={t.id}>
//             {t.title} ({t.status})
//             <button onClick={() => handleEdit(t)} style={{ marginLeft: "10px" }}>Edit</button>
//             <button onClick={() => handleDelete(t.id)} style={{ marginLeft: "5px" }}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <ModalForm
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleSubmit}
//         fields={[
//           { name: "title", label: "Title" },
//           { name: "description", label: "Description" },
//           { name: "status", label: "Status" }
//         ]}
//         initialData={currentTask}
//       />
//     </div>
//   );
// }

// export default TaskList;


import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/tasks"; // Assure-toi que la route backend est correcte

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Charger toutes les tâches
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors du chargement des tâches");
    }
  };

  // Création / mise à jour d’une tâche
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setMessage("✔ Tâche mise à jour !");
      } else {
        await axios.post(API_URL, form);
        setMessage("✔ Tâche créée !");
      }
      setForm({ title: "", description: "", status: "" });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de l’enregistrement");
    }
  };

  // Préparer le formulaire pour modifier une tâche
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      status: task.status
    });
    setEditingId(task.id);
  };

  // Supprimer une tâche
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette tâche ?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("🗑 Tâche supprimée !");
      fetchTasks();
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>Tâches</h2>

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
        {tasks.map((t) => (
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

export default TaskList;
