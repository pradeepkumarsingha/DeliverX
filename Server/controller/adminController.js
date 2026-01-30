const User = require("../models/User");
const SellerProfile = require("../models/SellerProfile");
const DeliveryProfile = require("../models/DeliveryProfile");

/* ================= GET ALL PENDING APPLICATIONS ================= */
exports.getApplications = async (req, res) => {
  try {
    const sellers = await SellerProfile.find({ status: "pending" })
      .populate("userId", "email name");

    const deliveries = await DeliveryProfile.find({ status: "pending" })
      .populate("userId", "email name");

    res.json({ sellers, deliveries });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

/* ================= APPROVE SELLER ================= */
exports.approveSeller = async (req, res) => {
  try {
    const seller = await SellerProfile.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: "Seller application not found" });
    }

    seller.status = "approved";
    seller.rejectReason = "";
    await seller.save();

    await User.findByIdAndUpdate(seller.userId, {
      role: "seller",
      sellerStatus: "approved",
    });

    res.json({ message: "Seller approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve seller" });
  }
};

/* ================= REJECT SELLER ================= */
exports.rejectSeller = async (req, res) => {
  try {
    const seller = await SellerProfile.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: "Seller application not found" });
    }

    seller.status = "rejected";
    seller.rejectReason = req.body.reason || "Rejected by admin";
    await seller.save();

    await User.findByIdAndUpdate(seller.userId, {
      sellerStatus: "rejected",
    });

    res.json({ message: "Seller rejected" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject seller" });
  }
};

/* ================= APPROVE DELIVERY ================= */
exports.approveDelivery = async (req, res) => {
  try {
    const delivery = await DeliveryProfile.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery application not found" });
    }

    delivery.status = "approved";
    delivery.rejectReason = "";
    await delivery.save();

    await User.findByIdAndUpdate(delivery.userId, {
      role: "delivery",
      deliveryStatus: "approved",
    });

    res.json({ message: "Delivery partner approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to approve delivery partner" });
  }
};

/* ================= REJECT DELIVERY ================= */
exports.rejectDelivery = async (req, res) => {
  try {
    const delivery = await DeliveryProfile.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery application not found" });
    }

    delivery.status = "rejected";
    delivery.rejectReason = req.body.reason || "Rejected by admin";
    await delivery.save();

    await User.findByIdAndUpdate(delivery.userId, {
      deliveryStatus: "rejected",
    });

    res.json({ message: "Delivery partner rejected" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reject delivery partner" });
  }
};
