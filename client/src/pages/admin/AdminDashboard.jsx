import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  TextField,
  Divider,
} from "@mui/material";
import Api from "../../services/Api";

const AdminDashboard = () => {
  const [data, setData] = useState({ sellers: [], deliveries: [] });
  const [rejectReason, setRejectReason] = useState("");

  const loadApplications = async () => {
    const res = await Api.get("/admin/applications");
    setData(res.data);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  /* ================= ACTION HANDLERS ================= */

  const approveSeller = async (id) => {
    await Api.post(`/admin/approve-seller/${id}`);
    loadApplications();
  };

  const rejectSeller = async (id) => {
    await Api.post(`/admin/reject-seller/${id}`, {
      reason: rejectReason,
    });
    setRejectReason("");
    loadApplications();
  };

  const approveDelivery = async (id) => {
    await Api.post(`/admin/approve-delivery/${id}`);
    loadApplications();
  };

  const rejectDelivery = async (id) => {
    await Api.post(`/admin/reject-delivery/${id}`, {
      reason: rejectReason,
    });
    setRejectReason("");
    loadApplications();
  };

  /* ================= UI ================= */

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        🧑‍⚖️ Admin Dashboard
      </Typography>

      {/* ================= SELLERS ================= */}
      <Typography variant="h6" mb={2}>
        Seller Applications
      </Typography>

      <Grid container spacing={2} mb={4}>
        {data.sellers.length === 0 && (
          <Typography color="text.secondary">No pending sellers</Typography>
        )}

        {data.sellers.map((s) => (
          <Grid item xs={12} md={6} key={s._id}>
            <Card>
              <CardContent>
                <Typography fontWeight={600}>{s.shopName}</Typography>
                <Typography variant="body2">
                  Email: {s.userId.email}
                </Typography>
                <Typography variant="body2">City: {s.city}</Typography>
                <Typography variant="body2">
                  Products: {s.products.join(", ")}
                </Typography>

                <Chip
                  label="PENDING"
                  color="warning"
                  size="small"
                  sx={{ mt: 1 }}
                />

                <Box mt={2} display="flex" gap={1}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => approveSeller(s._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => rejectSeller(s._id)}
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {/* ================= DELIVERY ================= */}
      <Typography variant="h6" mb={2}>
        Delivery Partner Applications
      </Typography>

      <Grid container spacing={2}>
        {data.deliveries.length === 0 && (
          <Typography color="text.secondary">
            No pending delivery applications
          </Typography>
        )}

        {data.deliveries.map((d) => (
          <Grid item xs={12} md={6} key={d._id}>
            <Card>
              <CardContent>
                <Typography fontWeight={600}>{d.fullName}</Typography>
                <Typography variant="body2">
                  Email: {d.userId.email}
                </Typography>
                <Typography variant="body2">City: {d.city}</Typography>
                <Typography variant="body2">
                  Vehicle: {d.vehicleType}
                </Typography>

                <Chip
                  label="PENDING"
                  color="warning"
                  size="small"
                  sx={{ mt: 1 }}
                />

                <Box mt={2} display="flex" gap={1}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => approveDelivery(d._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => rejectDelivery(d._id)}
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= REJECT REASON ================= */}
      <Box mt={4}>
        <TextField
          fullWidth
          label="Reject reason (optional)"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
