const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create a transporter using SMTP or other services
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_NAME,
    pass: process.env.APP_PASS_GOOGLE,
  },
});

// Function to send email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.GMAIL_NAME,
    to,
    subject,
    text,
    html,
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
