const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controller/customerController");

router.post("/order", auth, c.placeOrder);
router.get("/orders", auth, c.myOrders);
router.get("/orders/:id", auth, c.trackOrder);

module.exports = router;
