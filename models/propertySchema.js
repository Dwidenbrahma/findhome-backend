const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: true,
    },
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestType: {
      type: String,
      required: true,
      enum: ["buy", "rent"],
    },
    duration: {
      type: String,
      enum: ["short-term", "medium-term", "long-term"],
      default: null,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    moveInData: {
      type: Date,
      default: null,
    },
    specialRequest: {
      type: String,
      default: "",
    },
    budget: {
      type: Number,
      default: 0,
    },
    termAgree: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for optimization
propertySchema.index({ property_id: 1 });

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
