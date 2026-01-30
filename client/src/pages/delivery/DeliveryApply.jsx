import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  MenuItem,
  Alert,
} from "@mui/material";
import MainLayout from "../../layouts/MainLayout";
import Api from "../../services/Api";

const DeliveryApply = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    licenseNumber: "",
    panNumber: "",
    vehicleType: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // later connect backend API
    await Api.post("/delivery/apply", form);

    setSubmitted(true);
  };

  return (
    <MainLayout userRole="customer">
      <Box maxWidth={500} mx="auto">
        <Typography variant="h4" fontWeight={700} mb={2}>
          🚴 Apply as Delivery Partner
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your delivery partner application is under review.
          </Alert>
        )}

        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            required
            value={form.fullName}
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
            label="Driving License Number"
            name="licenseNumber"
            required
            value={form.licenseNumber}
            onChange={handleChange}
          />

          <TextField
            label="PAN Number"
            name="panNumber"
            required
            value={form.panNumber}
            onChange={handleChange}
          />

          <TextField
            select
            label="Vehicle Type"
            name="vehicleType"
            required
            value={form.vehicleType}
            onChange={handleChange}
          >
            <MenuItem value="Bike">Bike</MenuItem>
            <MenuItem value="Bicycle">Bicycle</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" size="large">
            Apply as Delivery Partner
          </Button>
        </Stack>
      </Box>
    </MainLayout>
  );
};

export default DeliveryApply;
