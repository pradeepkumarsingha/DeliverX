const express = require("express");
const router = express.Router();
const deliveryController = require("../controller/deliveryController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

/* ================= APPLY AS DELIVERY PARTNER ================= */
router.post(
  "/apply",
  auth,
  deliveryController.apply
);

router.get(
  "/my-orders",
  auth,
  role("delivery"),
  deliveryController.myOrders
);

/* ================= VIEW ACTIVE ORDERS ================= */
router.get(
  "/active-orders",
  auth,
  role("delivery"),
  deliveryController.active
);

/* ================= PICKUP ORDER (SELLER OTP) ================= */
router.put(
  "/pickup/:orderId",
  auth,
  role("delivery"),
  deliveryController.pickupOrder
);

/* ================= ACCEPT DELIVERY ORDER ================= */
router.put(
  "/accept/:orderId",
  auth,
  role("delivery"),
  deliveryController.acceptOrder
);

/* ================= COMPLETE DELIVERY (CUSTOMER OTP) ================= */
router.put(
  "/complete/:orderId",
  auth,
  role("delivery"),
  deliveryController.completeDelivery
);

module.exports = router;
