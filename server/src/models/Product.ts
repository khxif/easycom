import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image_url: { type: String, required: true },
    category: { type: [String], required: true },
    stock: { type: Number, required: true },
    location: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Product = mongoose?.models?.Product || mongoose.model('Product', productSchema);
