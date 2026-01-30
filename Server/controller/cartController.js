const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ✅ GET CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
     cart.items.push({
      productId: product._id,
  sellerId: product.sellerId, // 🔥 REQUIRED
  name: product.name,
  price: product.price,
  quantity: 1,
  image: product.image?.thumbnail,
});

    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE QUANTITY
exports.updateCartQty = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ REMOVE ITEM
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// const Product = require("../models/Product");
// const Cart = require("../models/Cart");

// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, quantity = 1 } = req.body;
//     const userId = req.user._id;

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = await Cart.create({ userId, items: [] });
//     }

//     const existing = cart.items.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existing) {
//       existing.quantity += quantity;
//     } else {
//       cart.items.push({
//         productId: product._id,
//         sellerId: product.sellerId,
//         name: product.name,
//         price: product.price,
//         image: product.image?.thumbnail,
//         quantity,
//       });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
