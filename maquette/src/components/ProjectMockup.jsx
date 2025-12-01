import React from "react";

export default function ProjectMockup() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="card w-[500px]">
        <h2 className="title text-center">Projet</h2>

        <form className="space-y-4">
          <div>
            <label>Nom du projet</label>
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

          <button className="btn-disabled w-full">Créer un projet</button>
        </form>
      </div>
    </div>
  );
}
