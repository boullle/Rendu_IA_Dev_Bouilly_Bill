const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");

// Middleware pour lire le JSON
console.log("userRoutes value:", userRoutes);

app.use(express.json());

// Routes
app.use("/users", userRoutes);

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));