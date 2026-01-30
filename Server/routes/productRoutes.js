const router = require("express").Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const p = require("../controller/productController");
const upload = require("../middleware/upload");  
/* CUSTOMER */
router.get("/", p.getAllProducts);
router.get("/:id", p.getProductById);

/* SELLER */
router.post("/", auth, role("seller"), p.createProduct);
router.get("/seller/my", auth, role("seller"), p.myProducts);
router.put("/:id", auth, role("seller"), p.updateProduct);
router.delete("/:id", auth, role("seller"), p.deleteProduct);

module.exports = router;
