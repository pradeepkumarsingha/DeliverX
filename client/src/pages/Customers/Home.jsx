import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Utensils, 
  ShoppingBasket, 
  Laptop, 
  Store
} from 'lucide-react';
import MainLayout from '../../layouts/MainLayout';
import ProductCard from '../../components/ProductCard';
import { getProducts } from "../../services/Api";
import { addToCart } from "../../services/Cartapi";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const categories = ['All', 'Food', 'Groceries', 'Electronics', 'Clothing', 'Books', 'Health', 'Beauty'];

  const featuredCategories = [
    {
      name: 'Food & Dining',
      icon: <Utensils size={32} className="text-red-500" />,
      bgColor: 'from-red-100 to-red-200',
      iconBg: 'bg-white/40',
      count: products.filter(p => p.category === 'Food').length,
    },
    {
      name: 'Groceries',
      icon: <ShoppingBasket size={32} className="text-emerald-500" />,
      bgColor: 'from-emerald-100 to-emerald-200',
      iconBg: 'bg-white/40',
      count: products.filter(p => p.category === 'Groceries').length,
    },
    {
      name: 'Electronics',
      icon: <Laptop size={32} className="text-blue-500" />,
      bgColor: 'from-blue-100 to-blue-200',
      iconBg: 'bg-white/40',
      count: products.filter(p => p.category === 'Electronics').length,
    },
  ];

  const highlights = [
    {
      icon: <Truck size={28} className="text-primary-main" />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered within 30 minutes',
    },
    {
      icon: <ShieldCheck size={28} className="text-emerald-500" />,
      title: 'Quality Assured',
      description: 'All products verified by our quality team',
    },
    {
      icon: <Clock size={28} className="text-orange-500" />,
      title: '24/7 Support',
      description: 'Round the clock customer support available',
    },
  ];

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await addToCart({
        productId: product._id,
        quantity: 1,
      });
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const handleBuyNow = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }
    await handleAddToCart(product);
    navigate("/customer/checkout");
  };

  return (
    <MainLayout userRole="customer">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl mb-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-primary-main shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'4\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative z-10 px-6 py-16 sm:py-24 md:px-12 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-lg"
          >
            Welcome to DeliverX 🚀
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-2xl font-medium text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md"
          >
            Fast, reliable, and smart. Discover amazing products from local sellers near you.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/20"
          >
            <div className="flex items-center bg-white rounded-xl overflow-hidden px-4 py-2">
              <Search className="text-slate-400 mr-2" size={24} />
              <input 
                type="text" 
                placeholder="Search for products, brands, or categories..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 outline-none text-slate-800 bg-transparent font-medium"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {highlights.map((highlight, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
          >
            <div className="w-14 h-14 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
              {highlight.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{highlight.title}</h3>
            <p className="text-slate-500 font-medium">{highlight.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Shop by Category</h2>
          <p className="text-slate-500 font-medium text-lg">Explore our most popular categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCategories.map((category, index) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (0.1 * index) }}
              key={index}
              onClick={() => setSelectedCategory(category.name.split(' ')[0])}
              className={`relative overflow-hidden cursor-pointer rounded-3xl bg-gradient-to-br ${category.bgColor} p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group`}
            >
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:blur-xl transition-all"></div>
              
              <div className={`w-16 h-16 rounded-2xl ${category.iconBg} flex items-center justify-center mb-6 shadow-inner backdrop-blur-sm`}>
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{category.name}</h3>
              <p className="text-slate-700 font-semibold opacity-90">{category.count} products</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Browse All Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const count = products.filter(p => p.category === category || category === 'All').length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  isSelected 
                    ? 'bg-primary-main text-white shadow-lg shadow-primary-main/30' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-main hover:text-primary-main'
                }`}
              >
                {category} <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Section */}
      <div>
        {filteredProducts.length === 0 ? (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
            <Store className="text-blue-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-blue-900 mb-2">No products found</h3>
            <p className="text-blue-700 font-medium">Try adjusting your search terms or browse different categories.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-baseline gap-2">
                {selectedCategory === 'All' ? 'Featured Products' : `${selectedCategory} Products`}
                <span className="text-sm font-medium text-slate-400">
                  ({filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''})
                </span>
              </h2>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-primary-main bg-primary-50 hover:bg-primary-100 transition-colors"
                >
                  View All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>
          </>
        )}
      </div>
        
    </MainLayout>
  );
};

export default Home;