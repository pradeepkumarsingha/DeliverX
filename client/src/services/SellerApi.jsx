import Api from "./Api";

// 🔹 Get all seller orders
export const getSellerOrders = () => {
  return Api.get("/seller/orders");
};

// 🔹 Accept / Reject order
export const updateOrderStatus = (orderId, status) => {
  return Api.put(
    `/seller/orders/${orderId}/status`,
    { status }, // ✅ VERY IMPORTANT
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const addProduct = (productData) => {
  return Api.post("/products", productData);
};
// 🔹 Mark order ready for pickup (OTP EMAIL SENT)
export const readyForPickup = (orderId) => {
  return Api.put(`/seller/orders/${orderId}/ready`);
};
