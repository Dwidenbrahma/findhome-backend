const express = require("express");
const homeUpload = require("../middleware/homeUpload");
const Home = require("../models/homeSchema");

const homePost = express.Router();

homePost.post("/posthome", (req, res) => {
  homeUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const {
        title,
        description,
        location,
        city,
        state,
        country,
        type,
        price,
        bedrooms,
        bathrooms,
        guests,
        amenities,
        owner_id,
        availability,
        coordinates,
        category,
        transactionType: originalTransactionType,
        duration,
        transportInfo,
      } = req.body;

      const parsedCoordinates =
        typeof coordinates === "string" ? JSON.parse(coordinates) : coordinates;

      const parsedTransportInfo =
        typeof transportInfo === "string"
          ? JSON.parse(transportInfo)
          : transportInfo;

      if (
        !title ||
        !description ||
        !location ||
        !city ||
        !state ||
        !country ||
        !price ||
        !bedrooms ||
        !bathrooms ||
        !guests ||
        !amenities ||
        !owner_id
      ) {
        return res
          .status(400)
          .json({ message: "Please fill in all required fields." });
      }

      let transactionType = originalTransactionType;
      if (type === "Hotel") {
        if (transactionType && transactionType !== "rent") {
          return res
            .status(400)
            .json({ message: "Hotels can only be rented." });
        }
        transactionType = "rent";
      }

      if (transactionType === "rent" && !duration) {
        return res
          .status(400)
          .json({ message: "Duration is required for rental properties." });
      }

      const images = req.files?.map((file) => file.path) || [];

      const newHome = new Home({
        title,
        description,
        location,
        city,
        state,
        country,
        type,
        transactionType: transactionType || null,
        duration: duration || null,
        price: Number(price),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        guests: Number(guests),
        amenities,
        images,
        owner: owner_id,
        availability,
        coordinates: parsedCoordinates,
        transportInfo: parsedTransportInfo,
        category,
      });

      await newHome.save();

      res.status(201).json({
        message: "Home successfully posted",
        home: newHome,
      });
    } catch (error) {
      console.error("Error saving home:", error);
      res.status(500).json({ message: error.message });
    }
  });
});

module.exports = homePost;
