const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resetPasswordTokenOwner: { type: String },
  resetPasswordExpireOwner: { type: String },
});

const Owner = mongoose.model("owner", userSchema);

module.exports = Owner;
