import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: false },
  role: {
    type: String,
    required: true,
    enum: ["super-admin", "admin", "user"],
    default: "user",
  },
});

export const User =
  mongoose?.models?.User || mongoose.model("User", userSchema);
