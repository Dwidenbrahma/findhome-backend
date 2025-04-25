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
const filterRoute = require("./routes/filterRoute");
const manageCustomer = require("./routes/manageCustomer");
const deleteProperty = require("./routes/deleteProperty");
const transaction = require("./routes/transaction");
const cancelBook = require("./routes/cancelBooking");

const app = express();

//database connectiona
connectDB();

///use all the folder

app.use(express.json());
app.use(cors());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));

//use routes;

//home route

app.use("/", home);
app.use("/", posthome);
app.use("/", loginRoute);
app.use("/", userRegistration);
app.use("/", test);
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
app.use("/", filterRoute);
app.use("/", manageCustomer);
app.use("/", deleteProperty);
app.use("/", transaction);
app.use("/", cancelBook);
//home route

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("app is live on: " + `http://localhost:${PORT}`);
});
