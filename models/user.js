import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  magicLinkToken: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
