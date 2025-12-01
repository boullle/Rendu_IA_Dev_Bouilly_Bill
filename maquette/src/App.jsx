import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import LoginMockup from "./components/LoginMockup";
import UserListMockup from "./components/UserListMockup";
import ProjectMockup from "./components/ProjectMockup";
import TaskMockup from "./components/TaskMockup";
import TicketMockup from "./components/TicketMockup";

export default function App() {
  const [view, setView] = useState("login");

  const screens = {
    login: <LoginMockup />,
    users: <UserListMockup />,
    projects: <ProjectMockup />,
    tasks: <TaskMockup />,
    tickets: <TicketMockup />
  };

  return (
    <div>
      <Navbar />

     <nav className="p-4 flex gap-3">
  {Object.keys(screens).map((key) => (
    <button
      key={key}
      className={`btn-primary ${view === key ? "opacity-80" : ""}`}
      onClick={() => setView(key)}
    >
      {key}
    </button>
  ))}
</nav>


      <main className="p-4">{screens[view]}</main>
    </div>
  );
}
