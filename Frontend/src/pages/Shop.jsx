import React, { useEffect, useState } from 'react';
import { 
    Box, Container, Grid, Typography, Card, CardMedia, 
    CardContent, Button, Chip, Skeleton 
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setAllVegetables } from '../redux/vegetableSlice';
import API from '../services/api';
import toast from 'react-hot-toast';
import { addToCart } from '../redux/cartSlice';

const Shop = () => {
    const dispatch = useDispatch();
    const addToCartHandler = (product) => {
    dispatch(addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        weight: product.weight,
        quantity: 1 // Default to 1 when first added
    }));
    toast.success(`${product.name} added to cart!`);
};
    const { allVegetables } = useSelector(state => state.vegetable);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get("/vegetable/get");
                if (res.data.success) {
                    dispatch(setAllVegetables(res.data.vegetables));
                }
            } catch (error) {
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [dispatch]);

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
                    Fresh <span style={{ color: '#ff3d00' }}>Vegetables</span>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Organic, hand-picked, and delivered straight to your kitchen.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {loading ? (
                    // Show Skeletons while loading
                    [1, 2, 3, 4].map((i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 4 }} />
                            <Skeleton sx={{ mt: 2 }} />
                            <Skeleton width="60%" />
                        </Grid>
                    ))
                ) : (
                    allVegetables.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product._id}>
                            <Card sx={{ 
                                borderRadius: 4, 
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                transition: '0.3s',
                                '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image || 'https://via.placeholder.com/300'}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Chip label={product.category} size="small" sx={{ bgcolor: '#fff3e0', color: '#ff3d00', fontWeight: 700 }} />
                                        <Typography variant="caption" color="text.secondary">{product.weight}</Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: '#ff3d00', fontWeight: 800, mb: 2 }}>
                                        ₹{product.price}
                                    </Typography>
                                    <Button 
    fullWidth 
    variant="contained" 
    startIcon={<ShoppingCart />}
    onClick={() => addToCartHandler(product)} // Add this line
    sx={{ 
        borderRadius: 2, 
        bgcolor: '#ff3d00', 
        '&:hover': { bgcolor: '#e63600' },
        textTransform: 'none',
        fontWeight: 700
    }}
>
    Add to Cart
</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default Shop;