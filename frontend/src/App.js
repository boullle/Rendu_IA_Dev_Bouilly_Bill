// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from "react";
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import TaskList from "./components/TaskList";
import ProjectList from "./components/ProjectList";
import TicketList from "./components/TicketList";

function App() {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>CRUD Frontend Example</h1>
      <UserList />
      <ProductList />
      <TaskList />
      <ProjectList />
      <TicketList />
    </div>
  );
}

export default App;
