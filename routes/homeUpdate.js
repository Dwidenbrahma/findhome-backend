const express = require("express");
const Home = require("../models/homeSchema");

const homeUpdate = express.Router();

homeUpdate.patch("/owner/update/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const field = Object.keys(updateData)[0];
    const value = updateData[field];

    const allowedFields = [
      "title",
      "description",
      "location",
      "city",
      "state",
      "country",
      "type",
      "price",
      "bedrooms",
      "bathrooms",
      "guests",
      "availability",
      "amenities",
    ];

    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field for update." });
    }

    const updated = await Home.findByIdAndUpdate(
      req.params.id,
      { [field]: value },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({
      message: `${field} updated`,
      updatedFieldValue: updated[field],
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = homeUpdate;
