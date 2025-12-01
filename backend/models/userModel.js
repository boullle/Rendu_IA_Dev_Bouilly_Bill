// models/userModel.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// Création de la table User avec contraintes
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,                      -- name obligatoire
      email TEXT UNIQUE NOT NULL,              -- email unique
      password TEXT NOT NULL CHECK (LENGTH(password) >= 8) -- password min 8 caractères
    )
  `);
});

// Fonction pour insérer un nouvel utilisateur
function createUser(name, email, password, callback) {
  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(query, [name, email, password], function (err) {
    callback(err, { id: this.lastID });
  });
}

// Fonction pour récupérer tous les utilisateurs
function getAllUsers(callback) {
  db.all(`SELECT id, name, email FROM users`, [], (err, rows) => {
    callback(err, rows);
  });
}

// Fonction pour récupérer un utilisateur par ID
function getUserById(id, callback) {
  db.get(`SELECT id, name, email FROM users WHERE id = ?`, [id], (err, row) => {
    callback(err, row);
  });
}


function updateUser(id, name, email, password, callback) {
  const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
  db.run(query, [name, email, password, id], callback);
}

function deleteUser(id, callback) {
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, [id], callback);
}
// Export des fonctions
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};