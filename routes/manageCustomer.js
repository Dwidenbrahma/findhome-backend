const express = require("express");
const manageCustomer = express.Router();
const Booking = require("../models/bookingScema");
const Home = require("../models/homeSchema"); // Make sure it's not Booking!
const User = require("../models/user");
const { verifyOwnerToken } = require("../controllers/jwtOwnerHelper");

// Middleware
const authenticateOwner = (req, res, next) => {
  const ownerToken = req.header("Authorization")?.replace("Bearer ", "");
  console.log(ownerToken);

  if (!ownerToken) {
    return res
      .status(400)
      .json({ message: "Unauthorized credential, Access denied" });
  }

  try {
    const decode = verifyOwnerToken(ownerToken);
    req.owner = decode;
    next();
  } catch (err) {
    console.error("Token verification failed:", err); // log the error for better debugging
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// GET /manage route
manageCustomer.get("/owner/manage", authenticateOwner, async (req, res) => {
  try {
    const ownerId = req.owner.owner_id;

    // Ensure you're using the correct field for the owner in the Home schema
    const homes = await Home.find({ owner: ownerId }); // Fixed field name from ownerId to owner
    const homeIds = homes.map((home) => home._id);

    const bookings = await Booking.find({ house: { $in: homeIds } });
    console.log("Bookings:", bookings); // Check if bookings are fetched properly

    const responseData = [];

    // Loop through bookings to fetch user and home details
    for (const booking of bookings) {
      const user = await User.findById(booking.renter); // Make sure to use `renter` instead of `userId`

      const home = homes.find((h) => h._id.equals(booking.house));

      if (user && home) {
        responseData.push({
          customerName: user.name,
          customerEmail: user.email,
          totalAmount: booking.totalPrice, // Correctly use totalPrice from booking
          propertyTitle: home.title || `${home.location}, ${home.type}`,
          guests: booking.guests,
        });
      }
    }

    res.json(responseData);
  } catch (err) {
    console.error("Error in /manage route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = manageCustomer;
