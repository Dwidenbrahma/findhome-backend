const express = require("express");
const jwt = require("jsonwebtoken");
const Owner = require("../models/owner");
const ownerprofile = require("../middleware/ownerProfileUpload");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

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

      await newOwner.save();
      res.status(200).json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    }
  }
);

module.exports = ownerRegistraion;
