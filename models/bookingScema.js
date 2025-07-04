const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  house: { type: mongoose.Schema.Types.ObjectId, ref: "Home", required: true },
  renter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  guests: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  SpecialRequest: { type: String, required: false },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
