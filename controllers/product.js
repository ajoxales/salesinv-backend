const ProductModel = require("../models/Product");

const addNewProduct = (req, res) => {
  const newProduct = new ProductModel({
    productName: req.body.productName,
    quantity: req.body.quantity,
    price: parseFloat(req.body.price),
  });

  newProduct
    .save()
    .then(() => {
      res.status(201).json({ message: "Product created successfully" });
    })
    .catch((error) => {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal server error" });
    });
};

const getProducts = (req, res) => {
  ProductModel.find().then((data) => {
    res.send(data);
  });
};

const getProduct = (req, res) => {
  ProductModel.findOne({ _id: req.params.id }).then((data) => {
    res.send(data);
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

const deleteProduct = (req, res) => {
  ProductModel.findByIdAndDelete(req.body.id).then(() => {
    ProductModel.find().then((data) => res.send(data));
  });
};

module.exports = {
  addNewProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
