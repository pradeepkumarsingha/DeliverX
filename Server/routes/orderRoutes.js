const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const {
  getMyOrders,
  getOrderById,
  getSellerOrders,
  updateOrderStatus,
} = require("../controller/orderController");

/* CUSTOMER */
router.get("/my", auth, getMyOrders);
router.get("/:id", auth, getOrderById);

/* SELLER */
router.get("/seller/all", auth, role("seller"), getSellerOrders);
router.put("/:id/status", auth, role("seller"), updateOrderStatus);

module.exports = router;
