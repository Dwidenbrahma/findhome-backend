// file: routes/userDash.js
import express from "express";
import { verifyToken } from "../controllers/jwtHelper.js";
import User from "../models/user.js";
import Booking from "../models/bookingScema.js";

const userDash = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach decoded data to request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

userDash.get("/user/dashboard", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookings = await Booking.find({ renter: userId }).populate("house");

    res.status(200).json({ user, bookings });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default userDash;
