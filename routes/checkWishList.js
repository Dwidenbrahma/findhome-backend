const express = require("express");
const checkWishList = express.Router();
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

checkWishList.get("/find-wish-list", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Use the userId from the decoded token

    // Find all favorite entries for the user
    const favorites = await Fav.find({ user_id: userId });

    // Calculate the number of properties in the wishlist
    const wishlistCount = favorites.length;

    const propertyIds = favorites.map((fav) => fav.property_id);

    res.status(200).json({
      wishlistCount, // Send the count of wishlist items
      propertyIds, // Send the list of property IDs
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Internal Error: ${err}` });
  }
});

module.exports = checkWishList;
