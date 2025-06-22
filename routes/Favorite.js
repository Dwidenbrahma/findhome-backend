import express from "express";
import Fav from "../models/favorite.js";
import { verifyToken } from "../controllers/jwtHelper.js";

const favorite = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Route to add a property to favorites
favorite.post("/favorite", authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const newFav = new Fav({
      property_id: propertyId,
      user_id: userId,
    });

    await newFav.save();
    res.status(200).json({ message: "Added to wish list" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `${err} occurred` });
  }
});

export default favorite;
