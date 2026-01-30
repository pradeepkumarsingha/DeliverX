const mongoose = require("mongoose");

const deliveryProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  fullName: String,
  phone: String,
  city: String,
  licenseNumber: String,
  panNumber: String,
  vehicleType: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  rejectReason: String,
});

module.exports = mongoose.model("DeliveryProfile", deliveryProfileSchema);
