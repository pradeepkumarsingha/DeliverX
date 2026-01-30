import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import Api from "../../services/Api";

const productOptions = [
  "Grocery",
  "Food",
  "Electronics",
  "Fashion",
  "Other",
];

const SellerApply = () => {
  const [form, setForm] = useState({
    shopName: "",
    phone: "",
    city: "",
    gstNumber: "",
    panNumber: "",
    products: [],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (product) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("TOKEN IN FRONTEND:", localStorage.getItem("token"));

    // later connect backend API
    await Api.post("seller/apply", form);

    setSubmitted(true);
  };

  return (
    <MainLayout userRole="customer">
      <Box maxWidth={500} mx="auto">
        <Typography variant="h4" fontWeight={700} mb={2}>
          🛒 Apply as Seller
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your seller application is under review.
          </Alert>
        )}

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          <TextField
            label="Shop Name"
            name="shopName"
            required
            value={form.shopName}
            onChange={handleChange}
          />

          <TextField
            label="Phone Number"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
          />

          <TextField
            label="City"
            name="city"
            required
            value={form.city}
            onChange={handleChange}
          />

          <TextField
            label="GST Number (optional)"
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
          />

          <TextField
            label="PAN Number"
            name="panNumber"
            required
            value={form.panNumber}
            onChange={handleChange}
          />

          <Box>
            <Typography fontWeight={600} mb={1}>
              Products you want to sell
            </Typography>

            {productOptions.map((product) => (
              <FormControlLabel
                key={product}
                control={
                  <Checkbox
                    checked={form.products.includes(product)}
                    onChange={() => handleProductChange(product)}
                  />
                }
                label={product}
              />
            ))}
          </Box>

          <Button type="submit" variant="contained" size="large">
            Apply as Seller
          </Button>
        </Stack>
      </Box>
    </MainLayout>
  );
};

export default SellerApply;
