import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true },
);
const Sale = mongoose?.models?.Sale || mongoose.model('Sale', saleSchema);
