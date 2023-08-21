const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  products: {
    type: [
      {
        productName: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  totalPrice: {
    type: Number,
  },
  datePurchased: {
    type: Date,
  },
});

module.exports = mongoose.model("transaction", transactionSchema);
