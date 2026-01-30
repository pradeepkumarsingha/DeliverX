const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();
const Razorpay = require("razorpay");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoute");
const paymentRoutes=require("./routes/PaymentRoute");



const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", require("./routes/orderRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err.message));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

if (
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.sendMessage
) {
  chrome.runtime.sendMessage(
    { type: "PING" },
    () => {
      if (chrome.runtime.lastError) {

      }
    }
  );
}

