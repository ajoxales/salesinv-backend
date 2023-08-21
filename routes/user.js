const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.get("/users", (req, res) => {
  UserController.getUsers(req, res);
});

router.get("/users/:id", (req, res) => {
  UserController.getUser(req, res);
});

router.post("/users", (req, res) => {
  UserController.createUser(req, res);
});

router.post("/login", (req, res) => {
  UserController.loginUser(req, res);
});

router.put("/users", (req, res) => {
  UserController.updateUser(req, res);
});

router.delete("/users", (req, res) => {
  UserController.deleteUser(req, res);
});

module.exports = router;
