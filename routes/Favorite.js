const express = require("express");
const favorite = express.Router();
const Fav = require("../models/favorite");
const { verifyToken } = require("../controllers/jwtHelper");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = verifyToken(token); // Decode the JWT token
    req.user = decoded; // Attach the decoded user data (including userId) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

favorite.post("/favorite", authenticateToken, async (req, res) => {
  try {
    const { propertyId } = req.body; // Get propertyId from the request body
    const userId = req.user.userId; // Extract userId from the decoded token (attached in authenticateToken)

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

module.exports = favorite;
