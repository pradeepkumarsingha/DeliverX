import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Paper,
  Alert,
  Container,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
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
      icon: <RestaurantIcon sx={{ fontSize: 32 }} />,
      color: '#ef4444',
      bgColor: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      count: products.filter(p => p.category === 'Food').length,
    },
    {
      name: 'Groceries',
      icon: <LocalGroceryStoreIcon sx={{ fontSize: 32 }} />,
      color: '#10b981',
      bgColor: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
      count: products.filter(p => p.category === 'Groceries').length,
    },
    {
      name: 'Electronics',
      icon: <ShoppingBagIcon sx={{ fontSize: 32 }} />,
      color: '#3b82f6',
      bgColor: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      count: products.filter(p => p.category === 'Electronics').length,
    },
  ];

  const highlights = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 28, color: 'primary.main' }} />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered within 30 minutes',
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 28, color: 'success.main' }} />,
      title: 'Quality Assured',
      description: 'All products verified by our quality team',
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 28, color: 'warning.main' }} />,
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
    try {
      await addToCart({
        productId: product._id,   // IMPORTANT
        quantity: 1,
      });
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

 
  const handleBuyNow = async (product) => {
    await handleAddToCart(product);
    navigate("/customer/checkout");
  };

  return (
      <MainLayout userRole="customer">
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          p: 6,
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              Welcome to DeliverX 🚀
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 400,
                opacity: 0.9,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Discover amazing products from local sellers near you
            </Typography>

            {/* Search Bar */}
            <Paper
              elevation={0}
              sx={{
                p: 1,
                maxWidth: 600,
                mx: 'auto',
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for products, brands, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'transparent',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Highlights Section */}
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          {highlights.map((highlight, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  },
                }} >
             
                <Box sx={{ mb: 2 }}>
                  {highlight.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {highlight.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {highlight.description}
                </Typography>
              </Paper>
            </Grid>

          ))}
        </Grid>
      </Box>

      {/* Featured Categories */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            textAlign: 'center',
          }}
        >
          Shop by Category
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Explore our most popular categories
        </Typography>

        <Grid container spacing={3}>
          {featuredCategories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  borderRadius: 3,
                  background: category.bgColor,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 80,
                    height: 80,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    transform: 'translate(40px, -40px)',
                  },
                }}
                onClick={() => setSelectedCategory(category.name.split(' ')[0])}
              >
                <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.count} products available
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Category Filter Chips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Browse All Categories
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={`${category} (${products.filter(p => p.category === category || category === 'All').length})`}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
              color={selectedCategory === category ? 'primary' : 'default'}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Products Section */}
      <Box>
        {filteredProducts.length === 0 ? (
          <Alert
            severity="info"
            sx={{
              borderRadius: 3,
              py: 4,
              '& .MuiAlert-icon': {
                fontSize: '3rem',
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              No products found
            </Typography>
            <Typography variant="body1">
              Try adjusting your search terms or browse different categories.
            </Typography>
          </Alert>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {selectedCategory === 'All' ? 'Featured Products' : `${selectedCategory} Products`}
                <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                  ({filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''})
                </Typography>
              </Typography>
              {selectedCategory !== 'All' && (
                <Button
                  variant="outlined"
                  onClick={() => setSelectedCategory('All')}
                  sx={{ borderRadius: 2 }}
                >
                  View All
                </Button>
              )}
            </Box>

            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
        
    </MainLayout>
  );
};

export default Home;