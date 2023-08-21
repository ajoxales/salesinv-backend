const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactions");

router.get("/user/transactions", (req, res) => {
  transactionController.getTransaction(req, res);
});

router.get("/transactions", (req, res) => {
  transactionController.getTransactions(req, res);
});

router.post("/user/transactions", (req, res) => {
  transactionController.createTransaction(req, res);
});

router.delete("/user/transactions", (req, res) => {
  transactionController.deleteTransaction(req, res);
});

module.exports = router;
