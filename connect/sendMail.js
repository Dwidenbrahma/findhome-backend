const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter using SMTP or other services
const transporter = nodemailer.createTransport({
  service: "gmail", // or use a custom SMTP server
  auth: {
    user: process.env.GMAIL_NAME, // your email
    pass: process.env.APP_PASS_GOOGLE, // your email password or app password
  },
});

// Function to send email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.GMAIL_NAME, // sender address
    to: to, // list of recipients
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // HTML body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject("Error occurred: " + error);
      } else {
        resolve("Email sent successfully: " + info.response);
      }
    });
  });
};

module.exports = { sendEmail };
