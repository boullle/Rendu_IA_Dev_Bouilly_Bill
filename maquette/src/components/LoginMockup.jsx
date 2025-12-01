import React from "react";

export default function LoginMockup() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="card w-96">
        <h2 className="title text-center">Connexion</h2>

        <form className="space-y-4">
          <div>
            <label>Email</label>
            <input className="form-input" type="email" disabled />
          </div>

          <div>
            <label>Mot de passe</label>
            <input className="form-input" type="password" disabled />
          </div>

          <button className="btn-disabled w-full">Connexion</button>
        </form>
      </div>
    </div>
  );
}
