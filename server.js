const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Product Calculator API is live!");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// POST: Add a new product
app.post("/api/products", async (req, res) => {
  const { name, price, quantity } = req.body;
  const total = price * quantity;

  try {
    const newProduct = new Product({ name, price, quantity, total });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Product save failed" });
  }
});

// GET: All products
app.get("/api/products", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// PUT: Update product info (edit)
app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// PUT: Mark product as sold (sell)
app.put("/api/products/:id/sell", async (req, res) => {
  const { sellNote } = req.body;

  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, {
      sold: true,
      sellDate: new Date(),
      sellNote
    }, { new: true });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Sell failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});