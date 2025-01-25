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

const app = express();

// Database connection
connectDB();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
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

app.use(express.static(path.join(__dirname, "/client/dist/")));
console.log(path.join(__dirname, "/client/dist/"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is live on: http://localhost:${PORT}`);
});
