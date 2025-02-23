import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  products: [
    {
      product: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const Cart = mongoose?.models?.Cart || mongoose.model('Cart', cartSchema);
