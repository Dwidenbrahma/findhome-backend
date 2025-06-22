// file: routes/homePost.js
import express from "express";
import homeUpload from "../middleware/homeUpload.js";
import Home from "../models/homeSchema.js";

const homePost = express.Router();

homePost.post("/posthome", (req, res) => {
  homeUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    console.log("Form Data:", req.body);
    console.log("Uploaded Files:", req.files);

    try {
      const {
        title,
        description,
        location,
        city,
        state,
        country,
        type,
        transactionType,
        duration,
        price,
        bedrooms,
        bathrooms,
        guests,
        amenities,
        owner_id,
        availability,
        coordinates,
        category,
        transportInfo, // Default empty array for transportInfo
      } = req.body;
      const parsedCoordinates =
        typeof coordinates === "string" ? JSON.parse(coordinates) : coordinates;
      const parsedTransportInfo =
        typeof transportInfo === "string"
          ? JSON.parse(transportInfo)
          : transportInfo;

      // Validate required fields
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

      if (type === "Hotel") {
        if (transactionType && transactionType !== "rent") {
          return res
            .status(400)
            .json({ message: "Hotels can only be rented." });
        }
        // If it's a hotel, set default transactionType to "rent"
        transactionType = "rent";
      }

      if (transactionType === "rent" && !duration) {
        return res
          .status(400)
          .json({ message: "Duration is required for rental properties." });
      }

      // Handle file paths for images (assuming images are uploaded)
      const images = req.files ? req.files.map((file) => file.path) : [];

<<<<<<< HEAD
      // Log amenities to check the structure
      console.log("Amenities:", amenities);

      // Create new Home instance
=======
>>>>>>> 1d21ac1fcc12929bc3ac44db84deb895071bfba0
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
<<<<<<< HEAD
        coordinates: parsedCoordinates, // use parsed
        transportInfo: parsedTransportInfo, // use parsed
        category,
=======
>>>>>>> 1d21ac1fcc12929bc3ac44db84deb895071bfba0
      });

      await newHome.save();
      console.log("Successfully inserted");
      res
        .status(201)
        .json({ message: "Home successfully posted", home: newHome });
    } catch (error) {
      console.error("Error saving home:", error);
      res.status(500).json({ message: error.message });
    }
  });
});

export default homePost;
