const Order = require("../models/Order");

/* ================= CUSTOMER ================= */

// Get all orders of logged-in customer
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Track single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= SELLER ================= */

// Seller: get their orders
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seller: update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body); // 🔍 ADD THIS

    const { orderId } = req.params;
    // let { status } = req.body;

    // if (!status) {
    //   return res.status(400).json({ message: "Status missing" });
    // }

    // status = status.toUpperCase(); // 🔒 normalize

    // if (!["PACKED", "REJECTED"].includes(status)) {
    //   return res.status(400).json({ message: "Invalid status" });
    // }/
    let { status } = req.body;

if (!status) {
  return res.status(400).json({ message: "Status missing" });
}

status = status.toUpperCase();

if (!["PACKED", "REJECTED"].includes(status)) {
  return res.status(400).json({ message: "Invalid status" });
}

order.orderStatus = status;
await order.save();


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
