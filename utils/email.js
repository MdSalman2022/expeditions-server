import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  try {
    await resend.emails.send({
      from: process.env.RESEND_SENDER_EMAIL,
      to,
      subject,
      text,
    });
    console.log("Email sent via Resend");
  } catch (error) {
    console.error("Resend error:", error.message);
    throw new Error("Failed to send email");
  }
};
