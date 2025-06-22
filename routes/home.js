import express from "express";
import Home from "../models/homeSchema.js";

const home = express.Router();

home.get("/", async (req, res) => {
  try {
    const homes = await Home.find(); // Fetch all homes from the database
    res.json(homes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default home;
