import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Department =
  mongoose?.models?.Department || mongoose.model('Department', departmentSchema);
