import express from "express";
import {
  sendLoginLink,
  verifyLogin,
  meController,
} from "../controllers/authController.js";
import { authenticateJWT } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send-link", sendLoginLink);
router.get("/verify", verifyLogin);
router.get("/me", authenticateJWT, meController);

export default router;
