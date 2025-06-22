const express = require("express");
const resetPassUser = express.Router();
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/resetController");

resetPassUser.post("/forgot-password", forgotPassword);
resetPassUser.post("/reset-password/:token", resetPassword);

module.exports = resetPassUser;
