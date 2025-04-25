const express = require("express");
const cancelBook = express.Router();
const Booking = require("../models/bookingScema");

cancelBook.delete("/cancel/booking/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);
    const Book = await Booking.findById(bookId);

    if (!Book) {
      return res.status(401).json({ message: "Resource does not exit" });
    }

    await Booking.findByIdAndDelete(bookId);
    res.status(200).json({ message: `Deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
});

module.exports = cancelBook;
