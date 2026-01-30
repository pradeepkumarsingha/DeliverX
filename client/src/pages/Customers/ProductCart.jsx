import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Avatar,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import StoreIcon from "@mui/icons-material/Store";

const ProductCart = ({ product, onAddToCart, onBuyNow }) => {
  // ✅ NORMALIZE IMAGE (handles string + object)
  console.log("🔥 PRODUCT CARD RENDERED", product.image);

  const imageSrc =
    typeof product.image === "string"
      ? product.image
      : product.image?.thumbnail || product.image?.original || "";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* ================= IMAGE ================= */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1 / 1", // 🔒 SAME SIZE FOR ALL
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >

      <img
  src={imageSrc || "/no-image.png"}
  alt={product.name}
  loading="lazy"
  onError={(e) => (e.target.src = "/no-image.png")}
  style={{
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  }}
/>

        {/* CATEGORY */}
        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(255,255,255,0.9)",
              fontWeight: 500,
            }}
          />
        )}

        {/* RATING */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "rgba(255,255,255,0.9)",
            px: 1,
            py: 0.5,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating value={4.2} readOnly size="small" />
          <Typography fontSize={12} ml={0.5}>
            4.2
          </Typography>
        </Box>
      </Box>

      {/* ================= CONTENT ================= */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* NAME */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </Typography>

        {/* SELLER */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
            <StoreIcon fontSize="small" />
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            Seller #{product.sellerId}
          </Typography>
        </Box>

        {/* PRICE */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight={700} color="primary">
            ₹{product.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{ ml: 1, textDecoration: "line-through", color: "text.secondary" }}
          >
            ₹{(product.price * 1.2).toFixed(2)}
          </Typography>
         
        </Box>

        {/* ACTION BUTTONS */}
        {/* <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<BoltIcon />}
            onClick={() => onBuyNow(product)}
            sx={{
              background:
                "linear-gradient(45deg, #2563eb 30%, #f59e0b 90%)",
            }}
          >
            Buy Now
          </Button>
        </Box> */}
        <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<BoltIcon />}
            onClick={() => onBuyNow(product)}
            sx={{
              background:
                "linear-gradient(45deg, #2563eb 30%, #f59e0b 90%)",
            }}
          >
            Buy Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCart;
