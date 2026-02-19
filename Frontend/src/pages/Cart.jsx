import React from 'react';
import { Container, Typography, Box, Paper, IconButton, Button, Divider, Stack, Grid } from '@mui/material';
import { Add, Remove, DeleteOutline, ShoppingBagOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';

const Cart = () => {
    const { items } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        try {
            const orderData = {
                // Mapping to 'vegetable' to match your order.model.js
                items: items.map(item => ({
                    vegetable: item._id, 
                    quantity: item.quantity
                })),
                totalAmount: totalPrice,
                address: "123 Fresh Lane, Veggie City" // Placeholder address
            };

            const res = await API.post("/order/create", orderData);
            
            if (res.data.success) {
                toast.success("Order placed! Your veggies are being prepped.");
                dispatch(clearCart()); 
                navigate('/'); // Redirect to Home or a Profile/Orders page
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            toast.error(error.response?.data?.message || "Failed to place order.");
        }
    };

    if (items.length === 0) {
        return (
            <Container sx={{ py: 10, textAlign: 'center' }}>
                <ShoppingBagOutlined sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Your cart is empty</Typography>
                <Button variant="contained" onClick={() => navigate('/shop')} sx={{ mt: 3, borderRadius: 3, bgcolor: '#ff3d00' }}>
                    Go Shopping
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Your Kitchen Basket</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {items.map((item) => (
                        <Paper key={item._id} elevation={0} sx={{ p: 2, mb: 2, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <img src={item.image || "https://via.placeholder.com/80"} alt={item.name} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.name}</Typography>
                                    <Typography variant="body2" color="#ff3d00" sx={{ fontWeight: 800 }}>₹{item.price}</Typography>
                                </Box>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton size="small" onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: Math.max(1, item.quantity - 1) }))}>
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <Typography sx={{ fontWeight: 700 }}>{item.quantity}</Typography>
                                    <IconButton size="small" onClick={() => dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }))}>
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Stack>
                                <IconButton color="error" onClick={() => dispatch(removeFromCart(item._id))}>
                                    <DeleteOutline />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))}
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} sx={{ p: 3, bgcolor: '#fdfdfd', border: '1px solid rgba(255, 61, 0, 0.1)', borderRadius: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Order Summary</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography color="text.secondary">Subtotal</Typography>
                            <Typography sx={{ fontWeight: 700 }}>₹{totalPrice}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography color="text.secondary">Delivery</Typography>
                            <Typography sx={{ fontWeight: 700, color: 'success.main' }}>FREE</Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Total</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#ff3d00' }}>₹{totalPrice}</Typography>
                        </Box>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            size="large" 
                            onClick={handleCheckout} 
                            sx={{ borderRadius: 3, fontWeight: 700, py: 1.5, bgcolor: '#ff3d00', '&:hover': { bgcolor: '#e63600' } }}
                        >
                            Checkout Now
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;