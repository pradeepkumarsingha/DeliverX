const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your gmail
    pass: process.env.EMAIL_PASS,   // app password
  },
});

/**
 * Send OTP email
 * @param {string} email - receiver email
 * @param {string} otp - otp code
 * @param {string} type - "pickup" | "delivery"
 */
exports.sendEmailOTP = async (email, otp, type = "delivery") => {
  const subject =
    type === "pickup"
      ? "DeliverX Pickup OTP"
      : "DeliverX Delivery OTP";

  const title =
    type === "pickup"
      ? "📦 Order Ready for Pickup"
      : "🚚 Your Order is Out for Delivery";

  await transporter.sendMail({
    from: `"DeliverX" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif">
        <h2>${title}</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing:3px">${otp}</h1>
        <p><b>Do not share this OTP with anyone.</b></p>
        <p>This OTP is valid for a short time.</p>
      </div>
    `,
  });
};

