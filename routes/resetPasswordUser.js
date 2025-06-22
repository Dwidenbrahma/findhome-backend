import express from "express";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/resetController.js";

const resetPassUser = express.Router();

resetPassUser.post("/forgot-password", forgotPassword);
resetPassUser.post("/reset-password/:token", resetPassword);

export default resetPassUser;
