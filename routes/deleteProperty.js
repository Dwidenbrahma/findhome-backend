const express = require("express");
const Home = require("../models/homeSchema");

const removeProperty = express.Router();

removeProperty.delete("/owner/delete/:id", async (req, res) => {
  const houseId = req.params.id;

  try {
    const home = await Home.findById(houseId);

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    await Home.findByIdAndDelete(houseId);

    res.status(200).json({ message: "Home successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Unable to delete home." });
  }
});

module.exports = removeProperty;
