import React from "react";

export default function TaskMockup() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="card w-[500px]">
        <h2 className="title text-center">Tâche</h2>

        <form className="space-y-4">
          <div>
            <label>Titre</label>
            <input className="form-input" type="text" disabled />
          </div>

          <div>
            <label>Description</label>
            <textarea className="form-input" disabled />
          </div>

          <div>
            <label>Statut</label>
            <input className="form-input" type="text" disabled />
          </div>

          <button className="btn-disabled w-full">Créer une tâche</button>
        </form>
      </div>
    </div>
  );
}
