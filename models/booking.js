import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expedition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expedition",
    required: true,
  },
  seats: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("booking", bookingSchema);
