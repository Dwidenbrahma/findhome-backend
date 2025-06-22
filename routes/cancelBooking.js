import express from "express";
import Booking from "../models/bookingScema.js";

const cancelBook = express.Router();

cancelBook.delete("/cancel/booking/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);

    const book = await Booking.findById(bookId);

    if (!book) {
      return res.status(401).json({ message: "Resource does not exist" });
    }

    await Booking.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
});

export default cancelBook;
