const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const profileUpload = require("../middleware/userProfileUpload");

const userRegistration = express.Router();
const SALTED = 10;

userRegistration.post(
  "/register",
  profileUpload.single("profileImage"),
  async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const profileImage = req.file ? req.file.path : null;

      // Checking Existing user
      const isExist = await User.findOne({ email });
      if (isExist) {
        return res
          .status(400)
          .json({ message: "User Email Already Exist", success: "False" });
      }

      const hashPassword = await bcrypt.hash(password, SALTED);
      console.log(hashPassword);

      const newUser = new User({
        name,
        email,
        password: hashPassword,
        profileImage,
        phone,
      });

      await newUser.save();
      res.status(201).json({
        message: "Registration is successful",
        userID: newUser._id,
      });

      console.log(newUser + "Successfully inserted into the database ");
    } catch (error) {
      res
        .status(400)
        .json({ message: `Registration is unsuccessful + ${error}` });
    }
  }
);

module.exports = userRegistration;
