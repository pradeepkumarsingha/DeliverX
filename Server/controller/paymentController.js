const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE RAZORPAY ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    console.error("Razorpay create order error:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// VERIFY PAYMENT + CREATE ORDER
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      address,
    } = req.body;

    const userId = req.user._id;

    // 🔐 Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    // 🛒 Fetch cart
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

   

    // 💰 Calculate total
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
      console.log("ADDRESS RECEIVED 👉", address);
    // 🧾 Create Order
    const order = await Order.create({
      userId,
        sellerId: cart.items[0].sellerId, 

      items: cart.items.map((item) => ({
        productId: item.productId,
        sellerId: item.sellerId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),

       deliveryAddress: {
          name: address.name,
          phone: address.phone,
          street: address.street,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
  },

      payment: {
        method: "ONLINE",
        transactionId: razorpay_payment_id,
        status: "SUCCESS",
      },

      totalAmount,
      orderStatus: "PLACED",
    });

    // 🧹 Clear cart
    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      orderId: order._id,
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ success: false });
  }
  
};
