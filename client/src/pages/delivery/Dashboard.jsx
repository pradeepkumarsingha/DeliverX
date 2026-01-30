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
  TextField,
  CircularProgress,
  Stack,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../../components/Navbar";
import {
  getActiveDeliveryOrders,
  getMyDeliveryOrders,
  acceptDeliveryOrder,
  pickupOrder,
  completeDelivery,
} from "../../services/deliveryApi";

const DeliveryDashboard = () => {
  const [availableOrders, setAvailableOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [otpMap, setOtpMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [availableRes, myRes] = await Promise.all([
        getActiveDeliveryOrders(),
        getMyDeliveryOrders(),
      ]);

      setAvailableOrders(availableRes.data || []);
      setMyOrders(myRes.data || []);
    } catch (err) {
      alert("Failed to load delivery orders");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await acceptDeliveryOrder(orderId);
      fetchAll(); // 🔁 moves order to My Orders
    } catch (err) {
      alert(err.response?.data?.message || "Accept failed");
    }
  };

  const handlePickup = async (orderId) => {
    try {
      await pickupOrder(orderId, otpMap[orderId]);
      alert("Pickup verified. Delivery OTP sent to customer 📧");
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Invalid pickup OTP");
    }
  };

  const handleComplete = async (orderId) => {
    try {
      await completeDelivery(orderId, otpMap[orderId]);
      alert("Delivery completed successfully ✅");
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || "Invalid delivery OTP");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "READY_FOR_PICKUP":
        return "warning";
      case "OUT_FOR_DELIVERY":
        return "primary";
      case "DELIVERED":
        return "success";
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
      <Navbar userRole="delivery" />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Delivery Partner Dashboard
        </Typography>

        {/* STATS */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <LocalShippingIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5">{availableOrders.length}</Typography>
                <Typography color="text.secondary">
                  Available Orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h5">{myOrders.length}</Typography>
                <Typography color="text.secondary">
                  My Active Orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* AVAILABLE ORDERS */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Available Orders
            </Typography>

            {availableOrders.length === 0 ? (
              <Typography color="text.secondary">
                No orders available
              </Typography>
            ) : (
              <List>
                {availableOrders.map((order, index) => (
                  <React.Fragment key={order._id}>
                    <ListItem>
                      <ListItemText
                        primary={`Order #${order._id}`}
                        secondary={`${order.deliveryAddress.city}, ${order.deliveryAddress.state}`}
                      />
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleAccept(order._id)}
                      >
                        Accept
                      </Button>
                    </ListItem>
                    {index < availableOrders.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </CardContent>
        </Card>

        {/* MY ORDERS */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              My Orders
            </Typography>

            {myOrders.length === 0 ? (
              <Typography color="text.secondary">
                No assigned orders
              </Typography>
            ) : (
              <List>
                {myOrders.map((order, index) => (
                  <React.Fragment key={order._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={`Order #${order._id}`}
                        secondary={`${order.deliveryAddress.city}, ${order.deliveryAddress.state}`}
                      />

                      <Box textAlign="right">
                        <Chip
                          label={order.orderStatus.replaceAll("_", " ")}
                          color={getStatusColor(order.orderStatus)}
                          size="small"
                          sx={{ mb: 1 }}
                        />

                        {order.orderStatus === "READY_FOR_PICKUP" && (
                          <Stack spacing={1}>
                            <TextField
                              size="small"
                              placeholder="Seller OTP"
                              onChange={(e) =>
                                setOtpMap({
                                  ...otpMap,
                                  [order._id]: e.target.value,
                                })
                              }
                            />
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handlePickup(order._id)}
                            >
                              Verify Pickup
                            </Button>
                          </Stack>
                        )}

                        {order.orderStatus === "OUT_FOR_DELIVERY" && (
                          <Stack spacing={1}>
                            <TextField
                              size="small"
                              placeholder="Customer OTP"
                              onChange={(e) =>
                                setOtpMap({
                                  ...otpMap,
                                  [order._id]: e.target.value,
                                })
                              }
                            />
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() => handleComplete(order._id)}
                            >
                              Complete Delivery
                            </Button>
                          </Stack>
                        )}
                      </Box>
                    </ListItem>

                    {index < myOrders.length - 1 && <Divider />}
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

export default DeliveryDashboard;
