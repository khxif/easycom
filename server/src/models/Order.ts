import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['CANCELLED', 'SUCCESS', 'FAILED', 'PENDING'] },
    amount: { type: Number, required: true },
    razorpay_order_id: { type: String },
    products: [
      {
        product: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true },
);

export const Order = mongoose?.models?.Order || mongoose.model('Order', orderSchema);
