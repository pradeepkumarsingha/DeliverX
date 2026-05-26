const nodemailer = require("nodemailer");

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  console.warn(
    "Email is not configured. Set EMAIL_USER and EMAIL_PASS in Server/.env"
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

/**
 * Send OTP email
 * @param {string} email - receiver email
 * @param {string} otp - otp code
 * @param {string} type - "pickup" | "delivery"
 */
exports.sendEmailOTP = async (email, otp, type = "delivery") => {
  if (!emailUser || !emailPass) {
    throw new Error("Email credentials are missing");
  }

  if (!email) {
    throw new Error("Recipient email is missing");
  }

  const subject =
    type === "pickup"
      ? "DeliverX Pickup OTP"
      : "DeliverX Delivery OTP";

  const title =
    type === "pickup"
      ? "📦 Order Ready for Pickup"
      : "🚚 Your Order is Out for Delivery";

  try {
    const info = await transporter.sendMail({
      from: `"DeliverX" <${emailUser}>`,
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

    console.log("Email OTP sent:", {
      to: email,
      type,
      messageId: info.messageId,
      response: info.response,
    });

    return info;
  } catch (err) {
    console.error("Email OTP send failed:", {
      to: email,
      type,
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      response: err.response,
      message: err.message,
    });

    throw new Error(`Email failed: ${err.response || err.message}`);
  }
};

