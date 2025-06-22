<<<<<<< HEAD
const express = require("express");
const review = express.Router();
const Home = require("../models/homeSchema");
=======
// file: routes/review.js
import express from "express";
import Home from "../models/homeSchema.js";

const review = express.Router();
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275

review.post("/review", async (req, res) => {
  try {
    const id = req.body.house._id;
    const data = req.body;

    const toPush = {
      user: data.user,
      comment: data.comment,
      date: data.date,
    };

    const result = await Home.findByIdAndUpdate(
      id,
      {
        $push: { reviews: toPush }, // Add new review to the array
      },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Home not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
});

<<<<<<< HEAD
module.exports = review;
=======
export default review;
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275
