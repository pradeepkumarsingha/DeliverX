const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const admin = require("../controller/adminController");

/* ================= APPLICATIONS ================= */
router.get(
  "/applications",
  auth,
  role("admin"),
  admin.getApplications
);

/* ================= SELLER ================= */
router.post(
  "/approve-seller/:id",
  auth,
  role("admin"),
  admin.approveSeller
);

router.post(
  "/reject-seller/:id",
  auth,
  role("admin"),
  admin.rejectSeller
);

/* ================= DELIVERY ================= */
router.post(
  "/approve-delivery/:id",
  auth,
  role("admin"),
  admin.approveDelivery
);

router.post(
  "/reject-delivery/:id",
  auth,
  role("admin"),
  admin.rejectDelivery
);

module.exports = router;
