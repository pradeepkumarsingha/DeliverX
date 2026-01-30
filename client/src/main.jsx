import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="846996853368-v7i50h2lff5jrv66v3gf2gmhb07po0i7.apps.googleusercontent.com">
      <App />
      
    </GoogleOAuthProvider>
  </StrictMode>
);
