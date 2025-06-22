import express from "express";
import panoramic from "../middleware/panoramicUpload.js";
import Home from "../models/homeSchema.js";

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

    const imagePaths = req.files.map((file) => file.path);

    if (!Array.isArray(home.panoramic)) {
      home.panoramic = [];
    }

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

export default panoramicView;
