import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Paper,
  Divider,
  Avatar,
  Stack,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const steps = [
  "PLACED",
  "PACKED",
  "READY_FOR_PICKUP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const TrackOrder = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, []);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8000/api/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrder(res.data);
    } catch (err) {
      console.error("Fetch order failed:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SAFETY GUARDS ---------------- */
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!order) return null;

  const paymentStatus = order.payment?.status || "PENDING";
  const activeStep = steps.indexOf(order.orderStatus);

  /* ---------------- UI ---------------- */
  return (
    <Box maxWidth={900} mx="auto" my={4}>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Track Order
            </Typography>
            <Typography color="text.secondary">
              Order ID: {order._id}
            </Typography>
          </Box>

          <Chip
            label={`Payment: ${paymentStatus}`}
            color={paymentStatus === "SUCCESS" ? "success" : "warning"}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* STEPPER */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step.replaceAll("_", " ")}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ my: 4 }} />

        {/* ITEMS */}
        <Typography variant="h6" fontWeight={600} mb={2}>
          Items
        </Typography>

        <Stack spacing={2}>
          {order.items?.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              gap={2}
              p={2}
              border="1px solid #eee"
              borderRadius={2}
            >
              <Avatar
                src={
                  typeof item.image === "string"
                    ? item.image
                    : item.image?.thumbnail
                }
                variant="rounded"
                sx={{ width: 70, height: 70 }}
              />

              <Box flexGrow={1}>
                <Typography fontWeight={600}>{item.name}</Typography>
                <Typography color="text.secondary">
                  Qty: {item.quantity}
                </Typography>
              </Box>

              <Typography fontWeight={600}>
                ₹{item.price}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* ADDRESS */}
        <Typography fontWeight={600}>
          Delivery Address
        </Typography>
        <Typography color="text.secondary">
          {order.deliveryAddress?.name} •{" "}
          {order.deliveryAddress?.phone}
        </Typography>
        <Typography color="text.secondary">
          {order.deliveryAddress?.street},{" "}
          {order.deliveryAddress?.city}
        </Typography>
        <Typography color="text.secondary">
          {order.deliveryAddress?.state} -{" "}
          {order.deliveryAddress?.pincode}
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* TOTAL */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            Total Amount
          </Typography>
          <Typography variant="h6" fontWeight={700} color="primary">
            ₹{order.totalAmount}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default TrackOrder;
