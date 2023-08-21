const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  productName: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
});

module.exports = mongoose.model("cart", cartSchema);
