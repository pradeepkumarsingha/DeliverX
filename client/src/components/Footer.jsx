
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        background: "linear-gradient(135deg, #0f172a, #020617)",
        color: "#e5e7eb",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          opacity: 0.25,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Top Section */}
        <Grid container spacing={4} sx={{ py: 8 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocalShippingIcon sx={{ color: "#6366f1", fontSize: 32 }} />
                <Typography variant="h5" fontWeight={800}>
                  DeliverX
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.7 }}>
                DeliverX is a modern local delivery platform connecting
                customers, sellers, and delivery partners with speed,
                reliability, and trust.
              </Typography>

              {/* Social Icons */}
              <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                {[FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon].map(
                  (Icon, i) => (
                    <IconButton
                      key={i}
                      sx={{
                        color: "#e5e7eb",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        "&:hover": {
                          backgroundColor: "#6366f1",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  )
                )}
              </Stack>
            </Stack>
          </Grid>

          {/* Links */}
          {[
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog"],
            },
            {
              title: "Support",
              links: ["Help Center", "Contact Us", "Safety"],
            },
            {
              title: "Legal",
              links: ["Terms & Conditions", "Privacy Policy", "Cookie Policy"],
            },
          ].map((section, index) => (
            <Grid item xs={6} md={2} key={index}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
                sx={{ color: "#f9fafb" }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1.2}>
                {section.links.map((link, i) => (
                  <Link
                    key={i}
                    href="#"
                    underline="none"
                    sx={{
                      color: "#9ca3af",
                      fontSize: 14,
                      "&:hover": {
                        color: "#6366f1",
                        pl: 0.5,
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} DeliverX. All rights reserved.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            Built with <span style={{ color: "#ef4444" }}>❤️</span> for fast local
            delivery
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
