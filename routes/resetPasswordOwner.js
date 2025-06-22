const express = require("express");
const resetPassOwner = express.Router();
const {
  forgotPasswordOwner,
  resetPasswordOwner,
} = require("../controllers/ownerReset");

resetPassOwner.post("/forgot-password", forgotPasswordOwner);
resetPassOwner.post("/reset-password/:token", resetPasswordOwner);

module.exports = resetPassOwner;
