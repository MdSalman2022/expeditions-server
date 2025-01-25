import express from "express";
import {
  createBooking,
  getBookingById,
  getBookings,
  deleteBooking,
} from "../controllers/bookingController.js";
import { authenticateJWT } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/roleCheck.js";

const router = express.Router();

router.post("/", authenticateJWT, createBooking);
router.get("/", authenticateJWT, getBookings);
router.get("/:id", authenticateJWT, getBookingById);
router.delete("/:id", authenticateJWT, isAdmin, deleteBooking);

export default router;
