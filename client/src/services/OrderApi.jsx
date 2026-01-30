import axios from "axios";

import api from "./Api";
/* ✅ MATCH BACKEND EXACTLY */
export const getMyOrders = async () => {
  const res = await api.get("/api/order/my"); 
  return res.data;
};

export const getOrderById = async (orderId) => {
  const res = await api.get(`/api/order/${orderId}`);
  return res.data;
};

