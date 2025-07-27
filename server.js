require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// DB Connection
const connectDB = require("./config/db");

// Routes
const home = require("./routes/home");
const posthome = require("./routes/posthome");
const userRegistration = require("./routes/userRegistration");
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
const propertyBooking = require("./routes/propertyBooking");
const resetPassUser = require("./routes/resetPasswordUser");
const resetPassOwner = require("./routes/resetPasswordOwner");
const favorite = require("./routes/Favorite");
const checkWishList = require("./routes/checkWishList");

// __dirname is available in CommonJS
const app = express();

connectDB();

// Middleware
app.use(
  cors({
    origin: "https://findhome-frontend.vercel.app", // allow only your frontend
    credentials: true, // if you plan to use cookies/auth headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folders
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.static(path.join(__dirname, "../frontend/dist")));

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
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
