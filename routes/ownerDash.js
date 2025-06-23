const express = require("express");
const Owner = require("../models/owner");
const Home = require("../models/homeSchema"); // <- You forgot to import this in the original code
const { verifyOwnerToken } = require("../controllers/jwtOwnerHelper");
const dotenv = require("dotenv");

dotenv.config();

const ownerDash = express.Router();

const authenticateOwner = (req, res, next) => {
  const ownerToken = req.header("Authorization")?.replace("Bearer ", "");

  if (!ownerToken) {
    return res
      .status(400)
      .json({ message: "Unauthorized credential, Access denied" });
  }

  try {
    const decode = verifyOwnerToken(ownerToken);
    req.owner = decode;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

ownerDash.get("/owner/dash", authenticateOwner, async (req, res) => {
  try {
    const ownerId = req.owner.owner_id;
    const admin = await Owner.findOne({ _id: ownerId });

    if (!admin) {
      return res.status(400).json({ message: "No such user exists!" });
    }

    const totalProperties = await Home.countDocuments({ owner: ownerId });

    res.status(200).json({ admin, totalProperties });
  } catch (err) {
    console.error("Error fetching owner data:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = ownerDash;
