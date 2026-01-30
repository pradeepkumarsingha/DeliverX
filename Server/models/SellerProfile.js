const mongoose = require("mongoose");

const sellerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  shopName: String,
  phone: String,
  city: String,
  gstNumber: String,
  panNumber: String,
  products: [String],

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  rejectReason: String,
});

module.exports = mongoose.model("SellerProfile", sellerProfileSchema);
