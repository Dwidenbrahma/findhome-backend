<<<<<<< HEAD
const express = require("express");
const ownerRegistraion = express.Router();
const Owner = require("../models/owner");
const ownerprofile = require("../middleware/ownerProfileUpload");
const bcrypt = require("bcryptjs");
require("dotenv").config();
=======
// file: routes/ownerRegistration.js
import express from "express";
import jwt from "jsonwebtoken";
import Owner from "../models/owner.js";
import ownerprofile from "../middleware/ownerProfileUpload.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275

dotenv.config();

const ownerRegistraion = express.Router();
const SALTED = 10;

ownerRegistraion.post(
  "/list/register",
  ownerprofile.single("profileImage"),
  async (req, res) => {
    try {
      let { name, email, password, phone } = req.body;
      const profileImage = req.file ? req.file.path : null;

      // Check if the email already exists
      const isExist = await Owner.findOne({ email });
      if (isExist) {
        return res
          .status(400)
          .json({ message: "Email ID already exists", success: "failed" });
      }

      const hashPassword = await bcrypt.hash(password, SALTED);

      const newOwner = new Owner({
        name,
        email,
        password: hashPassword,
        profileImage,
        phone,
      });

<<<<<<< HEAD
      newOwner.save();

=======
      await newOwner.save(); // Ensure saving is awaited
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275
      res.status(200).json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    }
  }
);

export default ownerRegistraion;
