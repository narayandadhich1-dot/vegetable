import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Paper, Divider } from '@mui/material';
import { AddCircleOutline, Inventory, Dashboard, Logout, Home, ShoppingBag } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
        { text: 'Add Product', icon: <AddCircleOutline />, path: '/admin/add-product' },
        { text: 'Inventory', icon: <Inventory />, path: '/admin/inventory' },
        { text: 'Orders', icon: <ShoppingBag />, path: '/admin/orders' }, // Added the Orders link
    ];

    return (
        <Paper elevation={0} sx={{ 
            width: 280, 
            height: '100vh', 
            position: 'sticky',
            top: 0,
            borderRight: '1px solid rgba(0,0,0,0.05)', 
            borderRadius: 0, 
            p: 2,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Typography variant="overline" sx={{ px: 2, fontWeight: 700, color: '#ff3d00', letterSpacing: 1.2 }}>
                Admin Management
            </Typography>
            
            <List sx={{ mt: 1, flexGrow: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton 
                            onClick={() => navigate(item.path)}
                            selected={location.pathname === item.path}
                            sx={{ 
                                borderRadius: '12px', 
                                '&.Mui-selected': { 
                                    bgcolor: 'rgba(255, 61, 0, 0.1)', 
                                    color: '#ff3d00',
                                    '& .MuiListItemIcon-root': { color: '#ff3d00' }
                                },
                                '&:hover': { bgcolor: 'rgba(255, 61, 0, 0.05)' } 
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 2 }} />
            
            <List>
                <ListItemButton onClick={() => navigate('/')} sx={{ borderRadius: '12px', mb: 1 }}>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Back to Shop" />
                </ListItemButton>
                <ListItemButton sx={{ borderRadius: '12px', color: '#d32f2f' }}>
                    <ListItemIcon sx={{ color: 'inherit' }}><Logout /></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </Paper>
    );
};

export default AdminSidebar;