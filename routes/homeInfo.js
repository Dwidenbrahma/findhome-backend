// file: routes/homeInfo.js
const express = require("express");
const Home = require("../models/homeSchema");

const homeInfo = express.Router();

homeInfo.get("/info/:id", async (req, res) => {
  try {
    const home = await Home.findById(req.params.id).populate(
      "reviews.user",
      "name profileImage"
    );

    if (!home) {
      return res.status(404).send({ message: "Home not found" });
    }
    res.json(home);
  } catch (error) {
    res.status(500).send({ message: "Error fetching home details" });
  }
});

module.exports = homeInfo;
