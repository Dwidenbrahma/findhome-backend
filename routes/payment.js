import express from "express";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import Payment from "../models/paymentSchema.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const payment = express.Router();

payment.post("/payment", async (req, res) => {
  console.log(req.body);
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Missing token" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { amount, property_id, user_email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      receipt_email: user_email,
      metadata: {
        user_id: decoded.userId,
        property_id,
      },
    });

    const paymentRecord = new Payment({
      amount,
      propertyId: property_id,
      userId: decoded.userId,
      email: user_email,
      status: "created",
      paymentIntentId: paymentIntent.id,
    });

    await paymentRecord.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: "Stripe payment error" });
  }
});

export default payment;
