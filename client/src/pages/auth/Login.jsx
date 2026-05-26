import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import Api from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Truck, Store, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await Api.post("/auth/google", {
        token: credentialResponse.credential, // ✅ ID TOKEN
      });

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // 🔥 ROLE-BASED REDIRECT
      const role = res.data.user.role;

      if (role === "seller") {
        navigate("/seller/dashboard");
      } else if (role === "delivery") {
        navigate("/delivery/dashboard");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/customer/dashboard");
      }
    } catch (error) {
      console.error("Google login failed", error);
      alert("Google login failed. Please try again.");
    }
  };

  /* ================= UI CONTENT ================= */
  const features = [
    {
      icon: <ShoppingBag size={24} className="text-primary-main" />,
      title: "Easy Shopping",
      description: "Browse and order from local sellers with ease",
    },
    {
      icon: <Truck size={24} className="text-secondary-main" />,
      title: "Fast Delivery",
      description: "Quick delivery by trusted partners",
    },
    {
      icon: <Store size={24} className="text-emerald-500" />,
      title: "Local Sellers",
      description: "Support nearby businesses",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* LEFT SIDE - BRANDING & FEATURES (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden text-white flex-col justify-between p-12 lg:p-20">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-primary-main/20 blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-secondary-main/20 blur-3xl mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-lg mx-auto flex-grow flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-main to-primary-light flex items-center justify-center shadow-lg">
              <Truck size={32} className="text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">DeliverX</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-6"
          >
            Your trusted delivery platform.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg mb-12"
          >
            Join thousands of users discovering local businesses and experiencing lightning-fast delivery every day.
          </motion.p>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (0.1 * index) }}
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-12 text-slate-500 text-sm w-full max-w-lg mx-auto">
          &copy; {new Date().getFullYear()} DeliverX Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 rounded-lg bg-primary-main flex items-center justify-center">
            <Truck size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-800">DeliverX</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-8 sm:p-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Truck size={32} className="text-primary-main" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium tracking-wide">
              Sign in to continue to DeliverX
            </p>
          </div>

          <div className="mt-8 flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => alert("Google login failed")}
            />
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-400">or explore first</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 font-bold text-sm transition-all focus:outline-none"
            >
              Continue as Guest
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="mt-10 text-center text-xs text-slate-400 leading-relaxed font-medium">
            By continuing, you agree to DeliverX’s{" "}
            <a href="#" className="underline hover:text-slate-600 transition-colors">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
