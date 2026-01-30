import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import MainLayout from "../../layouts/MainLayout";

import {
  getCart,
  updateCartQty,
  removeFromCart,
} from "../../services/Cartapi";

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load cart from backend
  const loadCart = async () => {
    try {
      const res = await getCart();
      setItems(res.data.items || []);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // 🔹 Increase quantity
  const increaseQty = async (item) => {
    await updateCartQty(item.productId, item.quantity + 1);
    loadCart();
  };

  // 🔹 Decrease quantity
  const decreaseQty = async (item) => {
    if (item.quantity === 1) {
      await removeFromCart(item.productId);
    } else {
      await updateCartQty(item.productId, item.quantity - 1);
    }
    loadCart();
  };

  // 🔹 Remove item
  const removeItem = async (productId) => {
    await removeFromCart(productId);
    loadCart();
  };

  // 🔹 Checkout
  const handleCheckout = () => {
    navigate("/customer/checkout");
  };

  // 🔹 Total price
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔹 Cart count for navbar
  const cartCount = items.reduce((t, i) => t + i.quantity, 0);

  if (loading) {
    return (
      <MainLayout cartCount={0} userRole="customer">
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <CircularProgress />
          <Typography mt={2}>Loading your cart...</Typography>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout cartCount={cartCount} userRole="customer">
      <Typography variant="h4" fontWeight={700} mb={3}>
        Your Cart
      </Typography>

      {items.length === 0 ? (
        <Typography>Your cart is empty 🛒</Typography>
      ) : (
        <>
          {items.map((item) => (
            <Paper
              key={item.productId}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                mb: 2,
                gap: 2,
              }}
            >
              <img
                src={item.image || "/no-image.png"}
                alt={item.name}
                width={80}
                height={80}
                style={{ objectFit: "contain" }}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight={600}>{item.name}</Typography>
                <Typography color="text.secondary">
                  ₹{item.price}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => decreaseQty(item)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => increaseQty(item)}>
                  <AddIcon />
                </IconButton>
              </Box>

              <Typography fontWeight={600}>
                ₹{item.price * item.quantity}
              </Typography>

              <IconButton
                color="error"
                onClick={() => removeItem(item.productId)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Total: ₹{total.toFixed(2)}
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </MainLayout>
  );
};

export default Cart;
