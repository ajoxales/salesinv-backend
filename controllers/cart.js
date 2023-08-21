const CartModel = require("../models/Cart");
const ProductModel = require("../models/Product");

const addToCart = (req, res) => {
  const { username, productName, price } = req.body;
  const quantity = 1;
  const totalAmount = parseFloat(quantity) * parseFloat(price);

  ProductModel.findOneAndUpdate(
    { productName },
    { $inc: { quantity: -quantity } }
  )
    .then(() => {
      return CartModel.findOneAndUpdate(
        { username, productName },
        {
          $inc: { quantity: quantity, totalAmount: totalAmount },
          $setOnInsert: {
            username,
            productName,
            price: parseFloat(price),
          },
        },
        { upsert: true }
      );
    })
    .then(() => {
      res.status(201).json({ message: "Added to cart successfully" });
    })
    .catch((error) => {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getCart = (req, res) => {
  const username = req.query.username;

  CartModel.find({ username })
    .then((cartItems) => {
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ error: "Cart not found" });
      }
      res.json(cartItems);
    })
    .catch((error) => {
      console.error("Error getting cart items:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const deleteCart = (req, res) => {
  const itemId = req.body.id;
  CartModel.findByIdAndDelete(itemId)
    .then(() => {
      ProductModel.findOneAndUpdate(
        { productName: req.body.productName },
        { $inc: { quantity: req.body.quantity } }
      ).then(() => {
        CartModel.find({ username: req.body.username }).then((cartItems) => {
          res.json(cartItems);
        });
      });
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const deleteCartItems = (req, res) => {
  const { username } = req.params;

  CartModel.deleteMany({ username })
    .then(() => {
      res.status(200).json({ message: "Cart items deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting cart items:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const updateProduct = (productName, quantityChange) => {
  const filter = { productName: productName };
  const updateProdValues = {
    $inc: { quantity: quantityChange },
  };

  ProductModel.findOneAndUpdate(filter, updateProdValues).catch((error) => {
    console.error("Error updating product quantity:", error);
  });
};

module.exports = {
  addToCart,
  getCart,
  deleteCart,
  updateProduct,
  deleteCartItems,
};
