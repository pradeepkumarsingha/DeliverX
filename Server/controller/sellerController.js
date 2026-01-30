const cloudinary = require("../config/cloudinary");
const Product = require("../models/Product");
const Order = require("../models/Order");

const SellerProfile = require("../models/SellerProfile");
const User = require("../models/User");

exports.applySeller = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shopName, phone, city, gstNumber, panNumber } = req.body;

    // 1️⃣ Basic validation
    if (!shopName || !phone || !city) {
      return res.status(400).json({
        message: "Shop name, phone and city are required",
      });
    }

    const user = await User.findById(userId);

    // 2️⃣ Only customers can apply
    if (user.role !== "customer") {
      return res.status(403).json({
        message: "Only customers can apply for seller",
      });
    }

    // 3️⃣ Prevent duplicate application
    const existingProfile = await SellerProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({
        message: "Seller application already submitted",
      });
    }

    // 4️⃣ Create seller profile
    await SellerProfile.create({
      userId,
      shopName,
      phone,
      city,
      gstNumber,
      panNumber,
      status: "pending",
    });

    // 5️⃣ Update user status
    user.sellerStatus = "pending";
    await user.save();

    res.json({
      message: "Seller application submitted. Under admin review.",
    });
  } catch (err) {
    console.error("Apply seller error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



/* ================= ADD PRODUCT ================= */
exports.addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      { folder: "products" }
    );

    const product = await Product.create({
      sellerId: req.user._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock || 0,
      image: {
        original: uploadResult.secure_url,
        thumbnail: uploadResult.secure_url.replace(
          "/upload/",
          "/upload/w_300,h_300,c_fit/"
        ),
      },
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/* ================= GET SELLER ORDERS ================= */

exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      sellerId: req.user._id   // 🔥 this matches your screenshot
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch seller orders" });
  }
};


/* ================= ACCEPT ORDER ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    console.log("PARAMS 👉", req.params);
    console.log("BODY 👉", req.body);

    const { orderId } = req.params;
    const { status } = req.body;

    // 🔥 THIS FIXES YOUR ERROR
    if (!status) {
      return res.status(400).json({ message: "Status missing" });
    }

    if (!["PACKED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findOne({
      _id: orderId,
      sellerId: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= READY FOR PICKUP ================= */
/* PACKED → READY_FOR_PICKUP + OTP */

const crypto = require("crypto");
const { sendEmailOTP } = require("../utils/sendEmailOtp");

/* ================= READY FOR PICKUP ================= */
exports.readyForPickup = async (req, res) => {
  try {
    const { orderId } = req.params;

    // 🔐 Generate OTP
    const pickupOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔥 IMPORTANT: populate sellerId to get email
    const order = await Order.findOne({
      _id: orderId,
      sellerId: req.user._id,
      orderStatus: "PACKED",
    }).populate("sellerId", "email name");

    if (!order) {
      return res.status(400).json({
        message: "Order not found or invalid state",
      });
    }

    if (!order.sellerId?.email) {
      return res.status(400).json({
        message: "Seller email not found",
      });
    }

    // 💾 Save OTP + status
    order.pickupOtp = pickupOtp;
    order.orderStatus = "READY_FOR_PICKUP";
    await order.save();

    console.log("✅ Pickup OTP SAVED IN DB:", pickupOtp);

    // 📧 Send OTP to SELLER EMAIL
    await sendEmailOTP(order.sellerId.email, pickupOtp, "pickup");

    console.log("📧 Pickup OTP sent to:", order.sellerId.email);

    res.json({
      message: "Order ready for pickup. OTP sent to seller email.",
    });
  } catch (err) {
    console.error("readyForPickup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
