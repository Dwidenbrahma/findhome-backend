<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const home = require("./routes/home");
const posthome = require("./routes/posthome");
const userRegistration = require("./routes/userRegistration");
const test = require("./routes/test");
const loginRoute = require("./routes/login");
const homeInfo = require("./routes/homeInfo");
const userDash = require("./routes/userDash");
const ownerRegistration = require("./routes/ownerRegistration");
const homeBooking = require("./routes/homeBooking");
const ownerDash = require("./routes/ownerDash");
const OwnerLogin = require("./routes/ownerLogin");
const review = require("./routes/review");
const property = require("./routes/property");
const homeUpdate = require("./routes/homeUpdate");
const panoramicUpload = require("./routes/panormicUpload");
const payment = require("./routes/payment");
const manageCustomer = require("./routes/manageCustomer");
const deleteProperty = require("./routes/deleteProperty");
const cancelBook = require("./routes/cancelBooking");
<<<<<<< HEAD
const propertyBooking = require("./routes/propertyBooking");
const resetPassUser = require("./routes/resetPasswordUser");
const resetPassOwner = require("./routes/resetPasswordOwner");
const favorite = require("./routes/Favorite");
const checkWishList = require("./routes/checkWishList");
=======
=======
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import home from "./routes/home.js";
import posthome from "./routes/posthome.js";
import userRegistration from "./routes/userRegistration.js";
import loginRoute from "./routes/login.js";
import homeInfo from "./routes/homeInfo.js";
import userDash from "./routes/userDash.js";
import ownerRegistration from "./routes/ownerRegistration.js";
import homeBooking from "./routes/homeBooking.js";
import ownerDash from "./routes/ownerDash.js";
import OwnerLogin from "./routes/ownerLogin.js";
import review from "./routes/review.js";
import path from "path";
import { fileURLToPath } from "url";

// Manually set __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275
>>>>>>> 1d21ac1fcc12929bc3ac44db84deb895071bfba0

//app initialized
const app = express();

// Database connection
connectDB();

// Middleware setup
app.use(express.json());
app.use(cors());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));

// Routes setup
app.use("/", home);
app.use("/", posthome);
app.use("/", loginRoute);
app.use("/", userRegistration);
app.use("/", homeInfo);
app.use("/", userDash);
app.use("/", ownerRegistration);
app.use("/", homeBooking);
app.use("/", ownerDash);
app.use("/", OwnerLogin);
app.use("/", review);
<<<<<<< HEAD
app.use("/", property);
app.use("/", homeUpdate);
app.use("/", panoramicUpload);
app.use("/", payment);

app.use("/", manageCustomer);
app.use("/", deleteProperty);

app.use("/", cancelBook);
app.use("/", propertyBooking);
app.use("/", resetPassUser);
app.use("/", resetPassOwner);
app.use("/", favorite);
app.use("/", checkWishList);
//home route
=======

app.use(express.static(path.join(__dirname, "/client/dist/")));
console.log(path.join(__dirname, "/client/dist/"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});
>>>>>>> 850cb95c587f3b84d8a18e7a083f381ee9c3b275

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is live on: http://localhost:${PORT}`);
});
