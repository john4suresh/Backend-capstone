const mongoose = require("mongoose");

const maidSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    price: Number,
    description: String,
    delivery: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maid", maidSchema);
