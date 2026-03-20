import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from './redux/authSlice';
import API from './services/api';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

// Notifications
import { Toaster } from 'react-hot-toast';

// Admin Components
import AddProduct from './components/Admin/AddProduct';
import AdminDashboard from './components/Admin/AdminDashboard';
import Inventory from './components/Admin/Inventory';
import OrderManagement from './components/Admin/OrderManagement';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/profile");

        if (res.data.success) {
          dispatch(setAuthUser(res.data.user));
          console.log("User loaded:", res.data.user); // ✅ Debug log
        }

      } catch (error) {
        dispatch(setAuthUser(null));
        console.log("No active session");
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Toaster position="top-center" reverseOrder={false} />

        <Navbar />

        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />

          {/* Admin Pages */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
        </Routes>

      </Box>
    </Router>
  );
}

export default App;