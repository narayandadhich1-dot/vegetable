import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Check if user is logged in from your auth state
    const { user } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    console.log("USER STATE:", user);

    const token = localStorage.getItem("token");

    if (!user || !token) {
        toast.error("Please login to add items");
        navigate('/login');
        return;
    }

    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
};

return (
    <Card 
        elevation={0} 
        sx={{ 
            height: '100%',           // 1. Force card to take full height of the grid row
            display: 'flex',          // 2. Enable Flexbox
            flexDirection: 'column',  // 3. Stack children vertically
            borderRadius: 4, 
            border: '1px solid rgba(0,0,0,0.05)', 
            transition: '0.3s',
            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
        }}
    >
        <CardMedia
    component="img"
    image={product.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500"}
    alt={product.name}
    sx={{
        height: 200,
        width: '100%',
        objectFit: 'cover',
    }}
/>
        <CardContent sx={{ 
            flexGrow: 1,              // 5. Makes content area expand to fill space
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
                    {product.name}
                </Typography>
                <Chip label={product.unit} size="small" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }} />
            </Box>

            <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                    mb: 2, 
                    height: 40,               // Fixed height for description
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,       // Limits text to 2 lines
                    WebkitBoxOrient: 'vertical'
                }}
            >
                {product.description}
            </Typography>

            {/* 6. This Box pushes the price and button to the very bottom */}
            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: '#ff3d00', fontWeight: 900 }}>
                    ₹{product.price}
                </Typography>
                <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<AddShoppingCart />}
                    onClick={handleAddToCart}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
                >
                    Add
                </Button>
            </Box>
        </CardContent>
    </Card>
);
};

export default ProductCard;