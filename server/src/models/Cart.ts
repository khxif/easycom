import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true },
  products: [
    {
      productId: { type: mongoose.Types.ObjectId, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const Cart = mongoose?.models?.Cart || mongoose.model('Cart', cartSchema);
