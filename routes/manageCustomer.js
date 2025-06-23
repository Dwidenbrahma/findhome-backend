const express = require("express");
const Booking = require("../models/bookingScema");
const Home = require("../models/homeSchema");
const User = require("../models/user");
const { verifyOwnerToken } = require("../controllers/jwtOwnerHelper");

const manageCustomer = express.Router();

// Middleware to authenticate owner
const authenticateOwner = (req, res, next) => {
  const ownerToken = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token:", ownerToken);

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
    console.error("Token verification failed:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

// GET route to manage customer bookings
manageCustomer.get("/owner/manage", authenticateOwner, async (req, res) => {
  try {
    const ownerId = req.owner.owner_id;

    const homes = await Home.find({ owner: ownerId });
    const homeIds = homes.map((home) => home._id);

    const bookings = await Booking.find({ house: { $in: homeIds } });

    const responseData = [];

    for (const booking of bookings) {
      const user = await User.findById(booking.renter);
      const home = homes.find((h) => h._id.equals(booking.house));

      if (user && home) {
        responseData.push({
          customerName: user.name,
          customerEmail: user.email,
          totalAmount: booking.totalPrice,
          propertyTitle: home.title || `${home.location}, ${home.type}`,
          guests: booking.guests,
        });
      }
    }

    res.json(responseData);
  } catch (err) {
    console.error("Error in /owner/manage route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = manageCustomer;
