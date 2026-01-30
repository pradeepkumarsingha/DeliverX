const DeliveryProfile = require("../models/DeliveryProfile");
const Order = require("../models/Order");
const { sendEmailOTP } = require("../utils/sendEmailOtp");
const User = require("../models/User");

/* ================= APPLY AS DELIVERY ================= */
exports.apply = async (req, res) => {
  try {
    const user = req.user;

    if (user.deliveryStatus === "approved") {
      return res.status(400).json({ message: "Already approved" });
    }

    await DeliveryProfile.findOneAndUpdate(
      { userId: user._id },
      { ...req.body, userId: user._id, status: "pending" },
      { upsert: true, new: true }
    );

    user.deliveryStatus = "pending";
    await user.save();

    res.json({ message: "Application submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ACCEPT DELIVERY ORDER ================= */
exports.acceptOrder = async (req, res) => {
  const { orderId } = req.params;

  // 🔒 Lock order atomically
  const order = await Order.findOneAndUpdate(
    {
      _id: orderId,
      orderStatus: "READY_FOR_PICKUP",
      deliveryPartnerId: null,
    },
    {
      deliveryPartnerId: req.user._id,
    },
    { new: true }
  );

  if (!order) {
    return res.status(400).json({
      message: "Order already accepted by another delivery partner",
    });
  }

  res.json({
    message: "Order accepted successfully",
    orderId: order._id,
  });
};

/* ================= ACTIVE ORDERS ================= */
exports.active = async (req, res) => {
  const orders = await Order.find({
    orderStatus: "READY_FOR_PICKUP",
    deliveryPartnerId: null,
  }).populate("sellerId userId");

  res.json(orders);
};

/* ================= MY ORDERS ================= */
exports.myOrders = async (req, res) => {
  const orders = await Order.find({
    deliveryPartnerId: req.user._id,
    orderStatus: { $in: ["READY_FOR_PICKUP", "OUT_FOR_DELIVERY"] },
  }).populate("userId sellerId");

  res.json(orders);
};
/* ================= PICKUP ORDER (SELLER OTP) ================= */



exports.pickupOrder = async (req, res) => {
  const { orderId } = req.params;
  const { otp } = req.body;

  const order = await Order.findOne({
    _id: orderId,
    deliveryPartnerId: req.user._id,
    orderStatus: "READY_FOR_PICKUP",
  }).populate("userId");

  if (!order) {
    return res.status(404).json({ message: "Order not assigned" });
  }

  if (order.pickupOtp !== String(otp)) {
    return res.status(400).json({ message: "Invalid pickup OTP" });
  }

  const deliveryOtp = Math.floor(100000 + Math.random() * 900000).toString();

  order.orderStatus = "OUT_FOR_DELIVERY";
  order.pickupOtp = null; // 🔥 IMPORTANT
  order.deliveryOtp = deliveryOtp;

  await order.save();

  await sendEmailOTP(order.userId.email, deliveryOtp);

  console.log("📧 Delivery OTP sent:", deliveryOtp);

  res.json({
    message: "Pickup verified. Delivery OTP sent to customer.",
  });
};


/* ================= COMPLETE DELIVERY (CUSTOMER OTP) ================= */
exports.completeDelivery = async (req, res) => {
  const { orderId } = req.params;
  const { otp } = req.body;

  const order = await Order.findOne({
    _id: orderId,
    deliveryPartnerId: req.user._id,
    orderStatus: "OUT_FOR_DELIVERY",
  });

  if (!order) {
    return res.status(404).json({
      message: "Order not assigned or not out for delivery",
    });
  }

  if (order.deliveryOtp !== String(otp)) {
    return res.status(400).json({ message: "Invalid delivery OTP" });
  }

  order.orderStatus = "DELIVERED";
  order.deliveryOtp = null;

  await order.save();

  res.json({ message: "Order delivered successfully" });
};

