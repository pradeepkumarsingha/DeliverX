import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../../components/Navbar";
import {
  getSellerOrders,
  updateOrderStatus,
  readyForPickup,
} from "../../services/sellerApi";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Fetch seller orders
  const fetchOrders = async () => {
    try {
      const res = await getSellerOrders();
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.orders;
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to load seller orders", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 ACCEPT
  const handleAcceptOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "PACKED");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Accept failed");
    }
  };

  // 🔹 REJECT
  const handleRejectOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "REJECTED");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Reject failed");
    }
  };

  // 🔹 READY FOR PICKUP
  const handleReadyForPickup = async (orderId) => {
    try {
      await readyForPickup(orderId);
      alert("OTP sent to seller email 📧");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "warning";
      case "PACKED":
        return "primary";
      case "READY_FOR_PICKUP":
        return "info";
      case "DELIVERED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box mt={6} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Navbar userRole="seller" />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Seller Dashboard
        </Typography>

        {/* STATS */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <InventoryIcon color="warning" sx={{ fontSize: 40 }} />
                <Typography variant="h5">
                  {orders.filter(o => o.orderStatus === "PLACED").length}
                </Typography>
                <Typography color="text.secondary">New Orders</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <LocalShippingIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5">
                  {orders.filter(o =>
                    ["PACKED", "READY_FOR_PICKUP"].includes(o.orderStatus)
                  ).length}
                </Typography>
                <Typography color="text.secondary">Active Orders</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h5">
                  {orders.filter(o => o.orderStatus === "DELIVERED").length}
                </Typography>
                <Typography color="text.secondary">Completed</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ height: "100%" }}>
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={() => navigate("/seller/add-product")}
                >
                  Add Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ORDERS */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Orders
            </Typography>

            {orders.length === 0 ? (
              <Typography color="text.secondary">
                No orders yet
              </Typography>
            ) : (
              <List>
                {orders.map((order, index) => (
                  <React.Fragment key={order._id}>
                    <ListItem>
                      <ListItemText
                        primary={`Order #${order._id}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              ₹{order.totalAmount} • {order.items.length} items
                            </Typography>
                            <br />
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {order.deliveryAddress.city},{" "}
                              {order.deliveryAddress.state}
                            </Typography>
                          </>
                        }
                      />

                      <Box textAlign="right">
                        <Chip
                          label={order.orderStatus.replaceAll("_", " ")}
                          color={getStatusColor(order.orderStatus)}
                          size="small"
                          sx={{ mb: 1 }}
                        />

                        {order.orderStatus === "PLACED" && (
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() =>
                                handleAcceptOrder(order._id)
                              }
                            >
                              Accept
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              variant="outlined"
                              onClick={() =>
                                handleRejectOrder(order._id)
                              }
                            >
                              Reject
                            </Button>
                          </Stack>
                        )}

                        {order.orderStatus === "PACKED" && (
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() =>
                              handleReadyForPickup(order._id)
                            }
                          >
                            Ready for Pickup
                          </Button>
                        )}
                      </Box>
                    </ListItem>

                    {index < orders.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SellerDashboard;
