import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Store } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-slate-50 overflow-hidden p-4 flex items-center justify-center">
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-md">
            {discountPercent}% OFF
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-sm"
        />
      </div>

      <div className="flex-grow flex flex-col p-5">
        {/* Category & Title */}
        <div className="mb-1">
          {product.category && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-main/70">
              {product.category}
            </span>
          )}
        </div>
        <h2 className="font-bold text-slate-800 text-lg leading-tight mb-2 line-clamp-2">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-snug flex-grow">
          {product.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center gap-2 mb-4 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5 w-max">
          <div className="w-5 h-5 rounded-md bg-primary-100 text-primary-main flex items-center justify-center">
            <Store size={12} />
          </div>
          <span className="text-xs font-semibold text-slate-600">
            Seller #{product.sellerId}
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-end gap-2 mb-5">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            ₹{product.price}
          </span>
          {hasDiscount && (
            <span className="text-sm font-semibold text-slate-400 line-through mb-1">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-primary-50 text-primary-main bg-white hover:bg-primary-50 font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-main/30"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
          <button
            onClick={() => onBuyNow(product)}
            className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-primary-main to-primary-light text-white font-bold text-sm shadow-md shadow-primary-main/20 hover:shadow-lg hover:shadow-primary-main/40 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-main/30"
          >
            <Zap size={16} className="fill-white" />
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;