import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {getMyOrders} from "../../services/OrderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
         "http://localhost:8000/api/order/my",
        

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDERS RESPONSE:", res.data);

      // ✅ GUARANTEE ARRAY
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (Array.isArray(res.data?.orders)) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={900} mx="auto" my={4}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography color="text.secondary">
          No orders found.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => (
            <Paper key={order._id} sx={{ p: 3, borderRadius: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={600}>
                  Order ID: {order._id}
                </Typography>

                <Chip
                  label={order.orderStatus}
                  color={
                    order.orderStatus === "DELIVERED"
                      ? "success"
                      : "warning"
                  }
                />
              </Box>

              <Typography color="text.secondary" mt={1}>
                Total Amount: ₹{order.totalAmount}
              </Typography>

              <Button
                variant="contained"
                startIcon={<LocalShippingIcon />}
                sx={{ mt: 2 }}
                onClick={() =>
                  navigate(`/track-order/${order._id}`)
                }
              >
                Track Order
              </Button>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Orders;
