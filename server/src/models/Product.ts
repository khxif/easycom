import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

export const Product =
  mongoose?.models?.Product || mongoose.model("Product", productSchema);
