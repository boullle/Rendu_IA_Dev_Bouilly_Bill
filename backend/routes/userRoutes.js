const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// CRUD
router.get("/", userController.getAllUsers);      // Read All
router.get("/:id", userController.getUserById);   // Read One
router.post("/", userController.createUser);      // Create
router.put("/:id", userController.updateUser);    // Update
router.delete("/:id", userController.deleteUser); // Delete

module.exports = router;