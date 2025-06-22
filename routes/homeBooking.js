<<<<<<< HEAD
const express = require("express");
const jwt = require("jsonwebtoken");
const Booking = require("../models/bookingScema");
const User = require("../models/user");
const Home = require("../models/homeSchema");
const { sendEmail } = require("../connect/sendMail");
=======
// file: routes/homeBooking.js
import express from "express";
import Booking from "../models/bookingScema.js"; // Ensure the model name is correct
import { verifyToken } from "../controllers/jwtHelper.js";
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275

const tempmail = "dwiden223@gmail.com";
const homeBooking = express.Router();

<<<<<<< HEAD
// ✅ Token authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
=======
homeBooking.post("/reserve/:id", async (req, res) => {
  const { startDate, endDate } = req.body;
  const houseId = req.params.id;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Start date and end date are required" });
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275

    req.user = user; // 👈 attaches decoded token to request
    next();
  });
};

// ✅ Route with middleware applied
homeBooking.post("/reserve/:id", authenticateToken, async (req, res) => {
  try {
    const renterId = req.user.userId;
    const houseId = req.params.id;

    console.log(renterId, houseId);
    const bookingData = {
      ...req.body,
      renter: renterId, // 👈 use decoded user from middleware
    };

    console.log("Booking details:", bookingData);

    const user_email = await User.findById(renterId);
    const house_details = await Home.findById(houseId);

    const booking = new Booking(bookingData);
    await booking.save();

    const subject = `Booking Confirmation: ${house_details.title}`;
    const textMessage = `
      Hello ${user_email.name},

      Congratulations! Your booking for the property "${
        house_details.title
      }" has been successfully confirmed.

      Here are your booking details:
      
      Property Name: ${house_details.title}
      Booking Date: ${new Date()}
      Check-in Date: ${bookingData.startDate}
      Check-out Date: ${bookingData.endDate}
      Total Amount: $${house_details.price}

      Thank you for choosing us. We look forward to hosting you!

      Best regards,
      The Team at FindHome
    `;
    const htmlMessage = `
      <html>
        <body>
          <h2>Booking Confirmation</h2>
          <p>Hello <strong>${user_email.name}</strong>,</p>
          <p>Congratulations! Your booking for the property <strong>"${
            house_details.title
          }"</strong> has been successfully confirmed.</p>

          <h3>Booking Details:</h3>
          <ul>
            <li><strong>Property Name:</strong> ${house_details.title}</li>
            <li><strong>Booking Date:</strong> ${new Date()}</li>
            <li><strong>Check-in Date:</strong> ${bookingData.startDate}</li>
            <li><strong>Check-out Date:</strong> ${bookingData.endDate}</li>
            <li><strong>Total Amount:</strong> $${house_details.price}</li>
          </ul>

          <p>Thank you for choosing us. We look forward to hosting you!</p>

          <p>Best regards,<br/>
          The Team at <strong>FindHome</strong></p>
        </body>
      </html>
    `;
    await sendEmail(tempmail, subject, textMessage, htmlMessage);

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: error.message });
  }
});

<<<<<<< HEAD
module.exports = homeBooking;
=======
// A utility function to calculate price based on start and end dates
const calculatePrice = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end - start); // Get the time difference in milliseconds
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

  const pricePerDay = 100; // Assume a fixed price per day
  return pricePerDay * dayDiff;
};

export default homeBooking;
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275
