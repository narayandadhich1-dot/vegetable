import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    return (
        <Card elevation={0} sx={{ 
            borderRadius: 4, 
            border: '1px solid rgba(0,0,0,0.05)', 
            transition: '0.3s',
            '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
        }}>
            <CardMedia
                component="img"
                height="180"
                image={product.image || "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500"}
                alt={product.name}
            />
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{product.name}</Typography>
                    <Chip label={product.unit} size="small" sx={{ fontWeight: 700, bgcolor: '#f5f5f5' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                    {product.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#ff3d00', fontWeight: 900 }}>₹{product.price}</Typography>
                    <Button 
                        variant="contained" 
                        size="small" 
                        startIcon={<AddShoppingCart />}
                        onClick={() => dispatch(addToCart(product))}
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