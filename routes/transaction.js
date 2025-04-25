const express = require("express");
const transaction = express.Router();
const Home = require("../models/homeSchema");

// Route: GET /transaction/:type
transaction.get("/transaction/:type", async (req, res) => {
  const type = req.params.type.toLowerCase(); // Ensure lowercase just in case

  try {
    const homes = await Home.find({ transactionType: type }); // Direct match
    res.status(200).json(homes);
  } catch (error) {
    console.error("Error fetching homes by transaction type:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = transaction;
