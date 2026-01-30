const express = require("express");
const router = express.Router();

const seller = require("../controller/sellerController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const upload = require("../middleware/upload");

router.post("/apply", 
  auth, 
  seller.applySeller);


/* PRODUCTS */
router.post(
  "/products",
  auth,
  role("seller"),
  upload.single("image"),
  seller.addProduct
);

router.get(
  "/orders",
  auth,
  role("seller"),
  seller.getSellerOrders
);

/* ORDERS */
router.put(
  "/orders/:orderId/status",
  auth,
   role("seller"),
  seller.updateOrderStatus
);


router.put(
  "/orders/:orderId/ready",
  auth,
  role("seller"),
  seller.readyForPickup
);

module.exports = router;
