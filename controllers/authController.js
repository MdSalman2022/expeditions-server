import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email.js";
import crypto from "crypto";

export const sendLoginLink = async (req, res) => {
  const { email } = req.body;
  console.log("got email", email);
  const token = crypto.randomBytes(20).toString("hex");

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { magicLinkToken: token },
      { upsert: true, new: true }
    );

    await sendEmail({
      to: email,
      subject: "Your Expedition Login Link",
      text: `Click here to login: ${process.env.CLIENT_URL}/verify?token=${token}`,
      html: `<p>Click <a href="${process.env.CLIENT_URL}/auth/verify?token=${token}">here</a> to login.</p>`,
    });

    res.status(200).json({ message: "Login link sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyLogin = async (req, res) => {
  const { token } = req.query;
  console.log("token", token);
  try {
    const user = await User.findOne({ magicLinkToken: token });
    if (!user) return res.status(401).json({ error: "Invalid token" });

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    user.magicLinkToken = undefined;
    await user.save();

    res.json({ token: jwtToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const meController = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json(req.user);
};
