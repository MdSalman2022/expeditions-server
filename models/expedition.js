import mongoose from "mongoose";

const expeditionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  bookedSeats: { type: Number, default: 0 },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Expedition", expeditionSchema);
