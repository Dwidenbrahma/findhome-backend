const express = require("express");
const Property = require("../models/propertySchema");

const propertyBooking = express.Router();

propertyBooking.post("/property/book", async (req, res) => {
  try {
    const {
      propertyId,
      buyer_id,
      contactEmail,
      contactPhone,
      budget,
      requestType,
      duration,
      moveInDate,
      specialRequests,
      contactName,
      termsAgreed,
    } = req.body;

    const newPropertyBook = new Property({
      property_id: propertyId,
      buyer_id,
      requestType: requestType.toLowerCase(),
      duration: duration ? `${duration.toLowerCase()}-term` : null,
      moveInData: moveInDate,
      specialRequest: specialRequests || "",
      budget: budget || 0,
      termAgree: termsAgreed,
      fullName: contactName,
      email: contactEmail,
      contactPhone,
      bookingStatus: "pending",
    });

    await newPropertyBook.save();

    res.status(201).json({
      message: "Property booking request submitted successfully",
      bookingId: newPropertyBook._id,
    });
  } catch (err) {
    console.error("Error booking property:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = propertyBooking;
