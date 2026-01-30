import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000/api",
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized – please login again");
    }
    return Promise.reject(error);
  }
);


export const getProducts = async () => {
  const res = await Api.get("/products");

  const normalizedProducts = res.data.map((p) => ({
    ...p,
    id: p._id,

    // ✅ force image to always be STRING
    
    image:
      typeof p.image === "string"
        ? p.image
        : p.image?.thumbnail || p.image?.original || "",
  }));

  return normalizedProducts;
};



export default Api;
