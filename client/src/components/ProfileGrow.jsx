import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MainLayout from "../layouts/MainLayout";

const ProfileGrow = ({ userRole = "customer" }) => {
  const navigate = useNavigate();

  // pending states (later come from backend)
  const isSellerPending = userRole === "seller-pending";
  const isDeliveryPending = userRole === "delivery-pending";

  return (
    <MainLayout userRole="customer">
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        {/* HEADER */}
        <Typography variant="h4" fontWeight={700} mb={1}>
          🔥 Grow with DeliverX
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Unlock new opportunities by becoming a Seller or a Delivery Partner.
        </Typography>

        {/* PENDING ALERTS */}
        {isSellerPending && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Your seller application is under review by admin.
          </Alert>
        )}

        {isDeliveryPending && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Your delivery partner application is under review by admin.
          </Alert>
        )}

        {/* OPTIONS */}
        <Grid container spacing={4}>
          {/* SELLER */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <StoreIcon color="primary" sx={{ fontSize: 42 }} />

                  <Typography variant="h6" fontWeight={600}>
                    Become a Seller
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    List your products, manage orders, and grow your business
                    with DeliverX.
                  </Typography>

                  <Button
                    variant="contained"
                    disabled={isSellerPending}
                    onClick={() => navigate("/seller/apply")}
                  >
                    {isSellerPending ? "Application Under Review" : "Apply as Seller"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* DELIVERY */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <LocalShippingIcon color="secondary" sx={{ fontSize: 42 }} />

                  <Typography variant="h6" fontWeight={600}>
                    Delivery Partner
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Earn by delivering orders in your nearby area with flexible
                    working hours.
                  </Typography>

                  <Button
                    variant="outlined"
                    disabled={isDeliveryPending}
                    onClick={() => navigate("/delivery/apply")}
                  >
                    {isDeliveryPending
                      ? "Application Under Review"
                      : "Apply as Delivery Partner"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default ProfileGrow;
