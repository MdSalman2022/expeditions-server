import express from "express";
import {
  createExpedition,
  getExpeditions,
  getPopularDestinations,
  updateExpedition,
  deleteExpedition,
  getBookingsPerMonth,
} from "../controllers/expeditionController.js";
import { isAdmin } from "../middlewares/roleCheck.js";
import { authenticateJWT } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticateJWT, isAdmin, createExpedition);
router.put("/:id", authenticateJWT, isAdmin, updateExpedition);
router.delete("/:id", authenticateJWT, isAdmin, deleteExpedition);

router.get("/", getExpeditions);
router.get("/analytics/popular", getPopularDestinations);
router.get("/analytics/bookings-per-month", getBookingsPerMonth);

export default router;
