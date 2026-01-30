import Api from "./Api";

export const getCart = () => Api.get("/cart");


export const addToCart = (data) =>
  Api.post("/cart/add", data);

export const updateCartQty = (productId, quantity) =>
  Api.put("/cart/update", { productId, quantity });

export const removeFromCart = (productId) =>
  Api.delete(`/cart/remove/${productId}`);

export const createRazorpayOrder = (data) => {
  return Api.post("/payment/create-order", data);
};

// 🔹 VERIFY PAYMENT
export const verifyPayment = (data) => {
  return Api.post("/payment/verify-payment", data);
};