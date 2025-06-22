import Owner from "../models/owner.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Forgot Password
export const forgotPasswordOwner = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Owner.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create reset token
    const OwnerResetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and save to database
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(OwnerResetToken)
      .digest("hex");

    user.resetPasswordTokenOwner = resetTokenHash;
    user.resetPasswordExpireOwner = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Reset URL
    const resetUrl = `http://localhost:5173/owner/reset-password/${OwnerResetToken}`;

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.APP_PASS_GOOGLE,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 15 minutes.</p>
      `,
    });

    res.status(200).json({ message: "Reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset Password
export const resetPasswordOwner = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const resetTokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  try {
    const user = await Owner.findOne({
      resetPasswordTokenOwner: resetTokenHash,
      resetPasswordExpireOwner: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordTokenOwner = undefined;
    user.resetPasswordExpireOwner = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
