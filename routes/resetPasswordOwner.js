import express from "express";
import {
  forgotPasswordOwner,
  resetPasswordOwner,
} from "../controllers/ownerReset.js";

const resetPassOwner = express.Router();

resetPassOwner.post("/forgot-password", forgotPasswordOwner);
resetPassOwner.post("/reset-password/:token", resetPasswordOwner);

export default resetPassOwner;
