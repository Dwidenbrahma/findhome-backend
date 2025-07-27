const express = require("express");
const panoramic = require("../middleware/panoramicUpload");
const Home = require("../models/homeSchema");

const panoramicView = express.Router();

panoramicView.patch("/owner/panoramic/:id", panoramic, async (req, res) => {
  try {
    const homeId = req.params.id;
    console.log("Home ID:", homeId);

    const home = await Home.findById(homeId);

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // For Cloudinary, use file.path or secure_url
    const imagePaths = req.files.map(
      (file) => file.path || file.secure_url || file.url
    );

    home.panoramic = Array.isArray(home.panoramic) ? home.panoramic : [];

    home.panoramic.push(...imagePaths);

    await home.save();

    res.status(200).json({
      message: "Panoramic images uploaded successfully",
      panoramic: home.panoramic,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = panoramicView;
