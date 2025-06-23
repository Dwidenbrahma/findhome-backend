const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Home" },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Fav = mongoose.model("Favorite", FavoriteSchema);

module.exports = Fav;
