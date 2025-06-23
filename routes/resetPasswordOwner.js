const express = require("express");
const {
  forgotPasswordOwner,
  resetPasswordOwner,
} = require("../controllers/ownerReset");

const resetPassOwner = express.Router();

resetPassOwner.post("/forgot-password", forgotPasswordOwner);
resetPassOwner.post("/reset-password/:token", resetPasswordOwner);

module.exports = resetPassOwner;
