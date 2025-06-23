const express = require("express");
const Home = require("../models/homeSchema");

const home = express.Router();

home.get("/", async (req, res) => {
  try {
    const homes = await Home.find(); // Fetch all homes from the database
    res.json(homes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = home;
