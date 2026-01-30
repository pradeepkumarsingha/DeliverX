import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Login from './pages/auth/Login';
import RoleSelect from './pages/auth/RoleSelect';
import CustomerDashboard from './pages/Customers/Home';
import SellerDashboard from './pages/Seller/Dashboard';
import DeliveryDashboard from './pages/delivery/Dashboard';
import ProductCart from './pages/Customers/ProductCart';
import Checkout from './pages/Customers/Checkout';

import ProfileGrow from './components/ProfileGrow';
import SellerApply from './pages/Seller/SellerApply';
import DeliveryApply from './pages/delivery/DeliveryApply';
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from './routes/ProtectedRoute';
import AddProduct from "./pages/Seller/AddProduct"; 
import Cart from './pages/Customers/Cart';
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Orders from "./pages/Customers/Orders";
import TrackOrder from "./pages/Customers/TrackOrder";
import { useParams } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const TrackOrderWrapper = () => {
  const { orderId } = useParams();
  return <TrackOrder orderId={orderId} />;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern blue
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b', // Warm amber
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981', // Emerald green
      light: '#34d399',
      dark: '#059669',
    },
    error: {
      main: '#ef4444', // Red
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
    },
    background: {
      default: '#f8fafc', // Light gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // Dark slate
      secondary: '#64748b', // Medium slate
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

function App() {
    const [loading, setLoading] = useState(true);
  useEffect(() => {
     
    // simulate app initialization (auth, config, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 1.2 seconds

    return () => clearTimeout(timer);
  }, []);

  // 🔥 FIRST PAGE LOADER
  if (loading) {
    return <Loader text="Starting DeliverX..." />;
  }
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Router>
          <Routes>
            {/* customer */}
            <Route path="/login" element={<Login />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />

            <Route path="/customer/product-cart" element={<ProductCart />} />
            <Route path="/customer/checkout" element={<Checkout />} />
            <Route path="/customer/cart" element={<Cart />} />
            {/* <Route path="/customer/orders" element={<Orders />} />
             */}
            <Route path="/customer/orders" element={<MainLayout> <Orders />
    </MainLayout>}/>
         
            <Route path="/track-order/:orderId" element={<MainLayout><TrackOrderWrapper /></MainLayout>} />   

            {/* seller */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
            {/* delivery partner */}
            <Route path="/" element={<Login />} />
            <Route path="/profile/grow" element={<ProfileGrow />} />
            <Route path="/seller/apply" element={<SellerApply />} />
            <Route path="/delivery/apply" element={<DeliveryApply />} />
           
            <Route path="/seller/add-product" element={<ProtectedRoute role="seller"><AddProduct /></ProtectedRoute>} />
            {/* admin */} 
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
         

          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;