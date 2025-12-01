import React from "react";

export default function TicketMockup() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="card w-[500px]">
        <h2 className="title text-center">Ticket</h2>

        <form className="space-y-4">
          <div>
            <label>Titre</label>
            <input className="form-input" type="text" disabled />
          </div>

          <div>
            <label>Description</label>
            <textarea className="form-input" disabled />
          </div>

          <button className="btn-disabled w-full">Créer un ticket</button>
        </form>
      </div>
    </div>
  );
}
