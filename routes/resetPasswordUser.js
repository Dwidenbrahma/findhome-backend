const express = require("express");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/resetController");

const resetPassUser = express.Router();

resetPassUser.post("/forgot-password", forgotPassword);
resetPassUser.post("/reset-password/:token", resetPassword);

module.exports = resetPassUser;
