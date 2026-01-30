const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addToCart,
  getCart,
  updateCartQty,
  removeFromCart,
} = require("../controller/cartController");

// 🔥 ALL CALLBACKS MUST EXIST
router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.put("/update", auth, updateCartQty);
router.delete("/remove/:productId", auth, removeFromCart);

module.exports = router;
