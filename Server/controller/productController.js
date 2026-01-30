const Product = require("../models/Product");

/* ================= SELLER ================= */


// Add product
exports.createProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    sellerId: req.user.id
  });
  res.json(product);
};

// Seller products
exports.myProducts = async (req, res) => {
  const products = await Product.find({ sellerId: req.user.id });
  res.json(products);
};

// Update product
exports.updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, sellerId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(product);
};

// Delete product
exports.deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({
    _id: req.params.id,
    sellerId: req.user.id
  });
  res.json({ message: "Product deleted" });
};

/* ================= CUSTOMER ================= */

// All active products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
};

console.log("Product =", Product);
console.log("Type =", typeof Product);

// Single product
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};
