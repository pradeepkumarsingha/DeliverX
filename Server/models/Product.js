const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },
  originalPrice: {
      type: Number, // MRP
    },

  category: {
  type: String,
  required: true,
  enum: ["Electronics", "Fashion", "Grocery", "Books", "Others"],
},


  image: {
  original: { type: String },
  thumbnail: { type: String },
  },


  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  stock: {
    type: Number,
    default: 0,
    min: 0,
  },

  rating: {
    type: Number,
    default: 4.0,
  },

  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);



// const Product = require("../models/Product");

// exports.addToCart = async (req, res) => {
//   const { productId, quantity = 1 } = req.body;
//   const userId = req.user._id;

//   const product = await Product.findById(productId);

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   let cart = await Cart.findOne({ userId });

//   if (!cart) {
//     cart = await Cart.create({ userId, items: [] });
//   }

//   const existing = cart.items.find(
//     (item) => item.productId.toString() === productId
//   );

//   if (existing) {
//     existing.quantity += quantity;
//   } else {
//     cart.items.push({
//       productId: product._id,
//       sellerId: product.sellerId, // ✅ THIS IS THE FIX
//       name: product.name,
//       price: product.price,
//       image: product.image?.thumbnail,
//       quantity,
//     });
//   }

//   await cart.save();
//   res.json(cart);
// };
