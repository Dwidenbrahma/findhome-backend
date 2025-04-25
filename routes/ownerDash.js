// file: routes/ownerDash.js
import express from "express";
import Owner from "../models/owner.js";
import { verifyOwnerToken } from "../controllers/jwtOwnerHelper.js";
import dotenv from "dotenv";

dotenv.config();

const ownerDash = express.Router();
<<<<<<< HEAD
//const User = require("../models/user");
const Owner = require("../models/owner");
//const Bookings = require("../models/bookingScema");
const Home = require("../models/homeSchema");
const { verifyOwnerToken } = require("../controllers/jwtOwnerHelper");
=======
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275

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
    console.error("Token verification failed:", err); // log the error for better debugging
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
    console.error("Error fetching owner data:", err); // log the error for better debugging
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

export default ownerDash;
