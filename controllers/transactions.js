const TransactionModel = require("../models/Transaction");

const createTransaction = (req, res) => {
  const { username, products, totalPrice, datePurchased } = req.body;

  const newTransaction = new TransactionModel({
    username,
    products,
    totalPrice,
    datePurchased,
  });

  newTransaction
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error("Error creating transaction:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getTransaction = (req, res) => {
  const username = req.query.username;

  TransactionModel.find({ username })
    .then((transaction) => {
      if (!transaction || transaction.length === 0) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json(transaction);
    })
    .catch((error) => {
      console.error("Error getting transactions:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getTransactions = (req, res) => {
  TransactionModel.find().then((data) => {
    res.send(data);
  });
};

const deleteTransaction = (req, res) => {
  TransactionModel.findByIdAndDelete(req.body.id).then(() => {
    TransactionModel.find().then((data) => res.send(data));
  });
};

module.exports = {
  getTransaction,
  getTransactions,
  deleteTransaction,
  createTransaction,
};
