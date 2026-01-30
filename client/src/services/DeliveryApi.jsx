import Api from "./Api";


/* ================= GET AVAILABLE ORDERS ================= */

// GET /api/delivery/active-orders
export const getActiveDeliveryOrders = () => {
  return Api.get("/delivery/active-orders");
};
/* ================= GET MY ORDERS ================= */
export const getMyDeliveryOrders = () => {
  return Api.get("/delivery/my-orders");
};
/* ================= ACCEPT DELIVERY ORDER ================= */

// PUT /api/delivery/accept/:orderId
export const acceptDeliveryOrder = (orderId) => {
  return Api.put(`/delivery/accept/${orderId}`);
};

/* ================= PICKUP ORDER (SELLER OTP) ================= */

// PUT /api/delivery/pickup/:orderId
export const pickupOrder = (orderId, otp) => {
  return Api.put(`/delivery/pickup/${orderId}`, {
    otp: String(otp), // 🔐 normalize OTP
  });
};

/* ================= COMPLETE DELIVERY (CUSTOMER OTP) ================= */

// PUT /api/delivery/complete/:orderId
export const completeDelivery = (orderId, otp) => {
  return Api.put(`/delivery/complete/${orderId}`, {
    otp: String(otp), // 🔐 normalize OTP
  });
};

