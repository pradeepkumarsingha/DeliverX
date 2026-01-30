const mongoose = require("mongoose");

  const orderSchema = new mongoose.Schema(
    {
      /* ================= CUSTOMER ================= */
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },  
                      
      /* ================= SELLER ================= */
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      /* ================= DELIVERY PARTNER ================= */
      deliveryPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      /* ================= ITEMS ================= */

      items:  {
    type:   [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
    
  ],
    validate: v => v.length > 0,
    required: true,
      },

      /* ================= AMOUNT ================= */
      totalAmount: {
        type: Number,
        required: true,
      },
      /* ================= PAYMENT ================= */
      payment: {
    method: {
      type: String,
      enum: ["ONLINE", "COD"],
      required: true,
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
  },


      /* ================= ORDER STATUS ================= */
      orderStatus: {
        type: String,
        enum: [
          "PLACED",
          "PACKED",
          "READY_FOR_PICKUP",
          "OUT_FOR_DELIVERY",
          "DELIVERED",
          "CANCELLED",
          "REJECTED",
        ],
        default: "PLACED",
      },

      /* ================= DELIVERY OTP ================= */
      pickupOtp: {
        type: String,
      },
      deliveryOtp: {
        type: String,
      },


      /* ================= ADDRESS ================= */
      deliveryAddress: {
        name: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
      },
    },
    { timestamps: true }
  );
  orderSchema.index({ userId: 1, createdAt: -1 });
  orderSchema.index({ sellerId: 1, createdAt: -1 });

  module.exports = mongoose.model("Order", orderSchema);
