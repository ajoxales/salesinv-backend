const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const MONGO_URI = process.env.MONGODB_URI;

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const transactionRoutes = require("./routes/transaction");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "SalesInventory",
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the API"); // Corrected the root route response
});

app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(transactionRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
