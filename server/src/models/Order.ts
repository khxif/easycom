import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'pending' },
  amount: { type: Number, required: true },
  products: [
    {
      product: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const Order = mongoose?.models?.Order || mongoose.model('Order', orderSchema);
