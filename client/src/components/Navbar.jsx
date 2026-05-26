import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  LayoutDashboard, 
  Truck, 
  User, 
  LogOut, 
  Flame, 
  ChevronDown,
  Menu as MenuIcon,
  X
} from "lucide-react";

const Navbar = ({ cartCount = 0, userRole = "customer" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isGuest = !token;

  const getNavItems = () => {
    if (isGuest) {
      return [
        { label: "Home", path: "/", icon: <LayoutDashboard size={18} /> },
      ];
    }
    switch (userRole) {
      case "customer":
        return [
          { label: "Dashboard", path: "/customer/dashboard", icon: <LayoutDashboard size={18} /> },
          {
            label: "Cart",
            path: "/customer/cart",
            icon: (
              <div className="relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary-main text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            ),
          },
          { label: "My Orders", path: "/customer/orders", icon: <Truck size={18} /> },
        ];
      case "seller":
        return [{ label: "Dashboard", path: "/seller/dashboard", icon: <LayoutDashboard size={18} /> }];
      case "delivery":
        return [{ label: "Dashboard", path: "/delivery/dashboard", icon: <LayoutDashboard size={18} /> }];
      default:
        return [];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const NavButton = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <button
        onClick={() => {
          navigate(item.path);
          setMobileMenuOpen(false);
        }}
        className={`flex items-center gap-3 px-4 flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive 
            ? "bg-primary-main/10 text-primary-main md:bg-slate-100 md:text-primary-main shadow-sm"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate(isGuest ? "/" : `/${userRole}/dashboard`)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-main to-primary-light flex items-center justify-center text-white font-bold shadow-lg shadow-primary-light/40 group-hover:shadow-primary-main/50 transition-all duration-300">
              <Truck size={22} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              DeliverX
            </span>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-2">
            {getNavItems().map((item) => <NavButton key={item.path} item={item} />)}

            {isGuest ? (
              <button 
                onClick={() => navigate("/login")}
                className="ml-2 px-5 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg shadow-md hover:bg-slate-800 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            ) : (
              <div className="relative ml-2">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-main/20"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary-main/10 text-secondary-main flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 mr-1 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {/* DESKTOP DROPDOWN MENU */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50 py-2"
                    >
                      <button 
                        onClick={() => { setProfileOpen(false); navigate(`/${userRole}/profile`); }}
                        className="w-full text-left px-5 py-2.5 flex items-center gap-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <User size={16} className="text-slate-400" />
                        Edit Profile
                      </button>

                      {userRole === "customer" && (
                        <button 
                          onClick={() => { setProfileOpen(false); navigate("/profile/grow"); }}
                          className="w-full text-left px-5 py-2.5 flex items-center gap-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Flame size={16} className="text-orange-500" />
                          Grow with DeliverX
                        </button>
                      )}

                      <div className="h-px bg-slate-100 my-2 mx-4" />

                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-2.5 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} className="text-red-400" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {getNavItems().map((item) => (
                <NavButton key={item.path} item={item} />
              ))}
              
              <div className="h-px bg-slate-100 my-4" />

              {isGuest ? (
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}
                  className="w-full mt-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl shadow-md"
                >
                  Sign In
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); navigate(`/${userRole}/profile`); }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    <User size={18} className="text-slate-400" />
                    Edit Profile
                  </button>
                  {userRole === "customer" && (
                    <button 
                      onClick={() => { setMobileMenuOpen(false); navigate("/profile/grow"); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <Flame size={18} className="text-orange-500" />
                      Grow with DeliverX
                    </button>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} className="text-red-400" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
