const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get("/user/cart", (req, res) => {
  cartController.getCart(req, res);
});

router.post("/user/cart", (req, res) => {
  cartController.addToCart(req, res);
});

router.put("/user/cart", (req, res) => {
  cartController.updateCart(req, res);
});

router.delete("/user/cart", (req, res) => {
  cartController.deleteCart(req, res);
});

router.delete("/user/cart/:id", (req, res) => {
  cartController.deleteCartItems(req, res);
});

module.exports = router;
