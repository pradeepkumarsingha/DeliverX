import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children, cartCount = 0, userRole = "customer" }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar cartCount={cartCount} userRole={userRole} />
      
      <main className="flex-grow py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
