// file: routes/ownerLogin.js
import express from "express";
import jwtOwner from "jsonwebtoken";
import Owner from "../models/owner.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const OwnerLogin = express.Router();

OwnerLogin.post("/owner/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request Body:", req.body); // Logging request body

    const ownerData = await Owner.findOne({ email });

    if (!ownerData) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, ownerData.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const ownerToken = jwtOwner.sign(
      { owner_id: ownerData._id, email: ownerData.email },
      process.env.JWT_SECRET2
    );

    res.send({ ownerToken });
  } catch (error) {
    console.error("Error during login:", error); // Logging error
    res
      .status(500)
      .json({ message: "Internal server error, please try again later" });
  }
});

export default OwnerLogin;
