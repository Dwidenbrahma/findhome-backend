const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  house: { type: mongoose.Schema.Types.ObjectId, ref: "House", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
