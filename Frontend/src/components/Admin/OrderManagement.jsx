import React, { useEffect, useState } from 'react';
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Chip, Select, MenuItem, FormControl 
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import AdminSidebar from './AdminSidebar';
import API from '../../services/api';
import toast from 'react-hot-toast';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);

    // 1. Fetch all orders from backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await API.get("/order/all");
                if (res.data.success) {
                    setOrders(res.data.orders);
                }
            } catch (error) {
                toast.error("Failed to load orders");
            }
        };
        fetchOrders();
    }, []);

    // 2. Handle Status Update
    const statusHandler = async (id, newStatus) => {
        try {
            const res = await API.put(`/order/admin/status/${id}`, { status: newStatus });
            if (res.data.success) {
                toast.success("Status updated!");
                // Update local state so UI reflects the change
                setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
            }
        } catch (error) {
            toast.error("Status update failed");
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
            <AdminSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 6 } }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ShoppingBag sx={{ fontSize: 40, color: '#ff3d00' }} /> 
                    Order <span style={{ color: '#ff3d00' }}>Management</span>
                </Typography>

                <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <Table>
                        <TableHead sx={{ bgcolor: '#fdfdfd' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order._id} hover>
                                    <TableCell>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{order.user?.fullname}</Typography>
                                        <Typography variant="caption" color="text.secondary">{order.user?.email}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        {order.items.map((item, idx) => (
                                            <Typography key={idx} variant="body2">
                                                {item.vegetable?.name} x {item.quantity}
                                            </Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#ff3d00' }}>₹{order.totalAmount}</TableCell>
                                    <TableCell sx={{ maxWidth: 200 }}>{order.address}</TableCell>
                                    <TableCell>
                                        <FormControl size="small" sx={{ minWidth: 120 }}>
                                            <Select
                                                value={order.status}
                                                onChange={(e) => statusHandler(order._id, e.target.value)}
                                                sx={{ borderRadius: 2, fontWeight: 600, fontSize: '0.8rem' }}
                                            >
                                                <MenuItem value="pending">Pending</MenuItem>
                                                <MenuItem value="confirmed">Confirmed</MenuItem>
                                                <MenuItem value="out-for-delivery">Out for Delivery</MenuItem>
                                                <MenuItem value="delivered">Delivered</MenuItem>
                                                <MenuItem value="cancelled">Cancelled</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default OrderManagement;