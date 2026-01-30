import Api from "./Api";

export const login = (data) =>
  Api.post("/auth/login", data);

export const googleLogin = (token) =>
  Api.post("/auth/google", { token });
