import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB Connection
import connectDB from "./config/db.js";

// Routes
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
import property from "./routes/property.js";
import homeUpdate from "./routes/homeUpdate.js";
import panoramicUpload from "./routes/panormicUpload.js";
import payment from "./routes/payment.js";
import manageCustomer from "./routes/manageCustomer.js";
import deleteProperty from "./routes/deleteProperty.js";
import cancelBook from "./routes/cancelBooking.js";
import propertyBooking from "./routes/propertyBooking.js";
import resetPassUser from "./routes/resetPasswordUser.js";
import resetPassOwner from "./routes/resetPasswordOwner.js";
import favorite from "./routes/Favorite.js";
import checkWishList from "./routes/checkWishList.js";

// App initialization
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "/client/dist")));

// Backend Routes
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

// React frontend fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
