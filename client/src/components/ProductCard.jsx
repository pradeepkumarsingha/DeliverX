import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Avatar,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BoltIcon from '@mui/icons-material/Bolt';
import StoreIcon from '@mui/icons-material/Store';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
   const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      {/* Product Image */}
      {/* Product Image */}
<Box
  sx={{
    width: "100%",
    aspectRatio: "1 / 1",        // ✅ forces square
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  }}
>
  <img
    src={product.image}
    alt={product.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",      // ✅ key fix for kettle
    }}
  />
</Box>


      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        {/* Product Name */}
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: 1.3,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </Typography>

        {/* Product Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {product.description}
        </Typography>

        {/* Seller Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
            <StoreIcon sx={{ fontSize: 14 }} />
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            Seller #{product.sellerId}
          </Typography>
        </Box>

        {/* Price Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
  <Typography
    variant="h6"
    sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1.25rem' }}
  >
    ₹{product.price}
  </Typography>

  {hasDiscount && (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ ml: 1, textDecoration: 'line-through' }}
      >
        ₹{product.originalPrice}
      </Typography>

      <Chip
        label={`${discountPercent}% OFF`}
        size="small"
        color="success"
        sx={{
          ml: 1,
          height: 18,
          fontSize: '0.65rem',
          fontWeight: 600,
          width: 'fit-content',
        }}
      />
    </>
  )}
</Box>


        {/* Action Buttons */}
        <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
            fullWidth
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.light',
                color: 'primary.dark',
              },
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            startIcon={<BoltIcon />}
            onClick={() => onBuyNow(product)}
            fullWidth
            sx={{
              background: 'linear-gradient(45deg, #2563eb 30%, #f59e0b 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1d4ed8 30%, #d97706 90%)',
              },
            }}
          >
            Buy Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;