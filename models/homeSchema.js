const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    type: {
      type: String,
      enum: ["Apartment", "Flat", "Villa", "Hotel"],
      required: true,
    },

    transactionType: {
      type: String,
      enum: ["rent", "buy"],
      required: function () {
        return this.type !== "Hotel";
      },
      validate: {
        validator: function (value) {
          if (this.type === "Hotel" && value === "buy") {
            return false;
          }
          return true;
        },
        message: "Hotels can only be rented, not bought.",
      },
      default: null,
    },

    duration: {
      type: String,
      enum: ["short-term", "medium-term", "long-term"],
      required: function () {
        return this.transactionType === "rent";
      },
      default: null,
    },

    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    guests: { type: Number, required: true },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    panoramic: { type: [String], default: [] },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "owner",
      required: true,
    },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      required: true,
      default: "Available",
    },

    coordinates: {
      type: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
      required: true,
    },

    category: {
      type: String,
      enum: ["General", "Student"],
      required: false,
      default: "General",
    },

    transportInfo: {
      type: [
        {
          airport: {
            name: { type: String, required: true },
            distance: { type: String, required: true },
          },
          bustop: {
            name: { type: String, required: true },
            distance: { type: String, required: true },
          },
          trainStation: {
            name: { type: String, required: true },
            distance: { type: String, required: true },
          },
        },
      ],
      required: false,
      default: [],
    },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
