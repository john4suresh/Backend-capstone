const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    price: Number,
    description: String,
    delivery: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
