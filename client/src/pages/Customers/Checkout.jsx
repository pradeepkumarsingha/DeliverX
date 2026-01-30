import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Divider,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import MainLayout from "../../layouts/MainLayout";
import { loadRazorpay } from "../../utils/LoadRazopay";


import {
  getCart,
  createRazorpayOrder,
  verifyPayment,
} from "../../services/Cartapi";

const steps = ["Shipping Address", "Payment", "Confirmation"];

const Checkout = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [errors, setErrors] = useState({});

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // 🔹 Load cart from backend
  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await getCart();
        setCartItems(res.data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const validateAddress = () => {
  const newErrors = {};

  if (!address.name.trim()) newErrors.name = "Name is required";
  if (!address.phone.trim()) newErrors.phone = "Phone is required";
  if (!address.street.trim()) newErrors.street = "Street is required";
  if (!address.city.trim()) newErrors.city = "City is required";
  if (!address.state.trim()) newErrors.state = "State is required";
  if (!address.pincode.trim()) newErrors.pincode = "Pincode is required";

  // optional: pincode length check
  if (address.pincode && address.pincode.length !== 6) {
    newErrors.pincode = "Pincode must be 6 digits";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handlePayment = async () => {
  try {
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    const orderRes = await createRazorpayOrder({
      amount: totalAmount,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderRes.data.amount,
      currency: "INR",
      name: "DeliverX",
      description: "Order Payment",
      order_id: orderRes.data.id,

      handler: async function (response) {
        const verifyRes = await verifyPayment({
          ...response,
          address,
        });

        if (verifyRes.data.success) {
          setActiveStep(2);
          setTimeout(() => {
          navigate(`/track-order/${verifyRes.data.orderId}`);
          }, 1500);
        }
      },

      prefill: {
        name: address.name,
        contact: address.phone,
      },

      theme: { color: "#2563eb" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (err) {
    console.error("Payment failed", err);
    alert("Payment failed");
  }
};


  if (loading) {
    return (
      <MainLayout userRole="customer">
        <Box textAlign="center" mt={6}>
          <CircularProgress />
          <Typography mt={2}>Loading checkout...</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <MainLayout userRole="customer">
        <Alert severity="info">Your cart is empty</Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole="customer">
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* STEP 1: ADDRESS */}
        {activeStep === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Shipping Address
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    required
                    value={address.name}
                    error={!!errors.name}
                    helperText={errors.name}
                    onChange={(e) =>
                      setAddress({ ...address, name: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Phone"
                    fullWidth
                    required
                    error={!!errors.phone}
                    helperText={errors.phone}
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({ ...address, phone: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Street Address"
                    fullWidth
                    required
                    error={!!errors.street}
                    helperText={errors.street}
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="City"
                    fullWidth
                    required
                    error={!!errors.city}
                    helperText={errors.city}
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    label="State"
                    fullWidth
                    required
                    error={!!errors.state}
                    helperText={errors.state}
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    label="Pincode"
                    fullWidth
                    required
                    error={!!errors.pincode}
                    helperText={errors.pincode}
                    value={address.pincode}
                    onChange={(e) =>
                      setAddress({ ...address, pincode: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                fullWidth
                disabled={paying}
                onClick={() =>
                  {
                    if (validateAddress()) {  
                      setActiveStep(1)}
                  } 
                }
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        )}

        {/* STEP 2: PAYMENT */}
        {activeStep === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Order Summary
              </Typography>

              {cartItems.map((item) => (
                <Box
                  key={item.productId}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography>
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography>₹{item.price * item.quantity}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" fontWeight={700}>
                Total: ₹{totalAmount}
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<PaymentIcon />}
                sx={{ mt: 3 }}
                fullWidth
                disabled={paying}
                onClick={handlePayment}
              >
                {paying ? "Processing..." : `Pay ₹${totalAmount}`}
              </Button>

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mt={2}
              >
                🔒 100% Secure Payments powered by Razorpay
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* STEP 3: CONFIRMATION */}
        {activeStep === 2 && (
          <Box textAlign="center" mt={6}>
            <CheckCircleIcon
              sx={{ fontSize: 80, color: "success.main" }}
            />
            <Typography variant="h5" mt={2}>
              Payment Successful 🎉
            </Typography>
            <Typography color="text.secondary">
              Redirecting to order tracking...
            </Typography>
          </Box>
        )}
      </Container>
    </MainLayout>
  );
};
console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);

export default Checkout;

