const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  
  role: {
    type: String,
    enum: ["customer", "seller", "delivery", "admin"],
    default: "customer",
  },

  sellerStatus: {
    type: String,
    enum: ["none", "pending", "approved", "rejected"],
    default: "none",
  },

  deliveryStatus: {
    type: String,
    enum: ["none", "pending", "approved", "rejected"],
    default: "none",
  },
});


module.exports = mongoose.model("User", userSchema);
