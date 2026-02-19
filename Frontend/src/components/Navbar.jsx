import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Avatar, Box, Container } from '@mui/material';
import { ShoppingCart, Dashboard, Person, Logout, LocalMall } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { setAuthUser } from '../redux/authSlice'; // Import your action
import API from '../services/api';
import toast from 'react-hot-toast'; // Assuming you use react-hot-toast

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { items } = useSelector(state => state.cart);
    const [anchorEl, setAnchorEl] = useState(null);

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    // --- LOGOUT HANDLER ---
    const logoutHandler = async () => {
        try {
            const res = await API.get("/user/logout");
            if (res.data.success) {
                // 1. Clear Redux state
                dispatch(setAuthUser(null));
                
                // 2. Clear Local Storage (Persisted State)
                localStorage.removeItem("persist:root");
                
                // 3. Close Menu and Navigate
                handleClose();
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Failed to logout");
        }
    };

    return (
        <AppBar 
            position="sticky" 
            elevation={0} 
            sx={{ 
                background: 'rgba(255, 255, 255, 0.85)', 
                backdropFilter: 'blur(15px)', 
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)', 
                color: '#2d2d2d' 
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        sx={{
                            fontWeight: 900,
                            textDecoration: 'none',
                            background: 'linear-gradient(45deg, #ff3d00, #ff9100)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <LocalMall sx={{ color: '#ff3d00' }} /> FreshVeggies
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Button 
                            component={Link} 
                            to="/shop" 
                            sx={{ color: '#444', fontWeight: 600, '&:hover': { color: '#ff3d00' } }}
                        >
                            Shop
                        </Button>

                        {user ? (
                            <>
                                <IconButton component={Link} to="/cart" sx={{ color: '#ff3d00' }}>
                                    <Badge badgeContent={totalItems} color="primary">
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>

                                <IconButton onClick={handleMenu} sx={{ p: 0, ml: 1 }}>
                                    <Avatar 
                                        sx={{ 
                                            width: 40, 
                                            height: 40, 
                                            bgcolor: '#ff3d00',
                                            boxShadow: '0 4px 12px rgba(255, 61, 0, 0.3)' 
                                        }}
                                    >
                                        {user?.fullname ? user.fullname[0].toUpperCase() : 'N'}
                                    </Avatar>
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    PaperProps={{
                                        sx: {
                                            mt: 1.5,
                                            borderRadius: '16px',
                                            minWidth: 200,
                                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                            border: '1px solid rgba(255, 61, 0, 0.05)'
                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleClose} component={Link} to="/profile">
                                        <Person sx={{ mr: 2, opacity: 0.7 }} /> My Profile
                                    </MenuItem>
                                    {user.role === 'admin' && (
                                        <MenuItem onClick={handleClose} component={Link} to="/admin/dashboard">
                                            <Dashboard sx={{ mr: 2, opacity: 0.7 }} /> Admin Dashboard
                                        </MenuItem>
                                    )}
                                    {/* UPDATED LOGOUT ITEM */}
                                    <MenuItem onClick={logoutHandler} sx={{ color: '#ff3d00' }}>
                                        <Logout sx={{ mr: 2 }} /> Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button 
                                    component={Link} 
                                    to="/login" 
                                    sx={{ color: '#ff3d00', fontWeight: 600 }}
                                >
                                    Login
                                </Button>
                                <Button 
                                    component={Link} 
                                    to="/register" 
                                    variant="contained" 
                                    sx={{ 
                                        borderRadius: '10px', 
                                        px: 3, 
                                        fontWeight: 700,
                                        boxShadow: '0 4px 14px rgba(255, 61, 0, 0.4)' 
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;