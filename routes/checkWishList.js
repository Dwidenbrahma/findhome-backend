const express = require("express");
const Fav = require("../models/favorite");
const { verifyToken } = require("../controllers/jwtHelper");

const checkWishList = express.Router();

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

checkWishList.get("/find-wish-list", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await Fav.find({ user_id: userId });

    const wishlistCount = favorites.length;
    const propertyIds = favorites.map((fav) => fav.property_id);

    res.status(200).json({
      wishlistCount,
      propertyIds,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Internal Error: ${err}` });
  }
});

module.exports = checkWishList;
