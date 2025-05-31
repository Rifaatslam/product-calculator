const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  cost: Number,
  total: Number,

  // Sell related fields
  sold: {
    type: Boolean,
    default: false
  },
  sellDate: Date,
  sellNote: String,

  // Product add করার সময়
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
