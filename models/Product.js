const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  sold: { type: Boolean, default: false },
  sellDate: { type: Date },
  sellNote: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
