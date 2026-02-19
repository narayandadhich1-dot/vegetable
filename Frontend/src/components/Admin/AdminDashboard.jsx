import React from 'react';
import { Box, Typography, Grid, Paper, Stack, Container } from '@mui/material';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import { Inventory, ShoppingBasket, Group, CurrencyRupee } from '@mui/icons-material';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Products', value: '12', icon: <Inventory />, color: '#ff3d00' },
        { label: "Today's Orders", value: '45', icon: <ShoppingBasket />, color: '#2e7d32' },
        { label: 'Total Customers', value: '120', icon: <Group />, color: '#1976d2' },
        { label: 'Revenue', value: '₹15,400', icon: <CurrencyRupee />, color: '#ed6c02' },
    ];

    return (
        // Flex container ensures Sidebar and Content sit side-by-side
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f4f4' }}>
            <AdminSidebar />
            
            <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: '#1a1a1a' }}>
                        Kitchen <span style={{ color: '#ff3d00' }}>Overview</span>
                    </Typography>
                    
                    <Grid container spacing={3}>
                        {stats.map((stat, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)', bgcolor: 'white' }}>
                                    <Stack spacing={1}>
                                        <Box sx={{ color: stat.color, display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {stat.icon}
                                            <Typography variant="body2" sx={{ fontWeight: 700 }}>{stat.label}</Typography>
                                        </Box>
                                        <Typography variant="h4" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Placeholder for Data Table or Graphs */}
                    <Paper elevation={0} sx={{ mt: 4, p: 4, borderRadius: 4, border: '1px solid rgba(0,0,0,0.05)', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'white' }}>
                        <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                            🚀 Order analytics and sales graphs will appear here.
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard;