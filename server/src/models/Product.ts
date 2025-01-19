import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  category: { type: String, required: true },
});

export const Product =
  mongoose?.models?.Product || mongoose.model("Product", productSchema);
