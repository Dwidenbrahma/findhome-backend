const express = require("express");
const filterRoute = express.Router();
const Home = require("../models/homeSchema");

filterRoute.get("/:type", async (req, res) => {
  try {
    const type = req.params.type;

    const allowedTypes = ["Apartment", "Flat", "Hotel", "Villa"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid property type." });
    }

    const homes = await Home.find({ type });
    res.status(200).json(homes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = filterRoute;
