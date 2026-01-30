import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import Api from "../../services/Api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Container,
  Grid,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /* ================= GOOGLE LOGIN ================= */

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await Api.post("/auth/google", {
        token: credentialResponse.credential, // ✅ ID TOKEN
      });

      // // Save JWT
      // localStorage.setItem("token", res.data.token);

      // // Navigate based on role
      // navigate(`/customer/dashboard`);
      // Save JWT
localStorage.setItem("token", res.data.token);

// 🔥 ROLE-BASED REDIRECT
const role = res.data.user.role;

if (role === "seller") {
  navigate("/seller/dashboard");
} else if (role === "delivery") {
  navigate("/delivery/dashboard");
} else if (role === "admin") {
  navigate("/admin");
} else {
  navigate("/customer/dashboard");
}

    } catch (error) {
      console.error("Google login failed", error);
      alert("Google login failed. Please try again.");
    }
  };

  /* ================= UI CONTENT ================= */

  const features = [
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 32, color: "primary.main" }} />,
      title: "Easy Shopping",
      description: "Browse and order from local sellers with ease",
    },
    {
      icon: <DeliveryDiningIcon sx={{ fontSize: 32, color: "secondary.main" }} />,
      title: "Fast Delivery",
      description: "Quick delivery by trusted partners",
    },
    {
      icon: <StoreIcon sx={{ fontSize: 32, color: "success.main" }} />,
      title: "Local Sellers",
      description: "Support nearby businesses",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          {/* LEFT SIDE */}
          {!isMobile && (
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: "primary.main",
                    mb: 3,
                    mx: "auto",
                  }}
                >
                  🚚
                </Avatar>

                <Typography variant="h3" fontWeight={700} mb={1}>
                  DeliverX
                </Typography>

                <Typography variant="h6" color="text.secondary" mb={4}>
                  Your trusted delivery platform
                </Typography>

                <Grid container spacing={3}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          backgroundColor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                          {feature.icon}
                        </Box>
                        <Typography fontWeight={600} align="center" mb={1}>
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          )}

          {/* RIGHT SIDE – LOGIN */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 5,
                borderRadius: 3,
                maxWidth: 420,
                mx: "auto",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
            >
              <Box textAlign="center" mb={4}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "primary.main",
                    mb: 3,
                    mx: "auto",
                  }}
                >
                  🚚
                </Avatar>

                <Typography variant="h4" fontWeight={600}>
                  Welcome Back
                </Typography>

                <Typography color="text.secondary">
                  Sign in to continue to DeliverX
                </Typography>
              </Box>

              {/* ✅ GOOGLE LOGIN BUTTON */}
              <Box display="flex" justifyContent="center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => alert("Google login failed")}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                display="block"
              >
                By continuing, you agree to DeliverX’s Terms of Service and Privacy Policy
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
