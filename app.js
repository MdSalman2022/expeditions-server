import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import expeditionRoutes from "./routes/expeditionRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { initializeSocket, initIO } from "./utils/socket.js";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);

const io = initializeSocket(server);
initIO(io);
global.io = io;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Expedition Backend is running! 🚀",
    routes: {
      auth: "/api/auth",
      expeditions: "/api/expeditions",
      bookings: "/api/bookings",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/expeditions", expeditionRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
