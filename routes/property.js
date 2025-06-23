const express = require("express");
const Home = require("../models/homeSchema");
const { verifyOwnerToken } = require("../controllers/jwtOwnerHelper");
const dotenv = require("dotenv");

dotenv.config();

const property = express.Router();

property.get("/owner/properties", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔐 Token received:", token);

    const decoded = verifyOwnerToken(token);
    console.log("🧾 Decoded token:", decoded);

    const ownerId = decoded.owner_id;
    console.log("👤 Owner ID from token:", ownerId);

    const properties = await Home.find({ owner: ownerId })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error fetching properties:", error);
    res.status(500).json({ error: "Server error while fetching properties." });
  }
});

module.exports = property;
