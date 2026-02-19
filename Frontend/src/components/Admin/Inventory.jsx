import React, { useEffect, useState } from 'react';
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Avatar, Chip, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField 
} from '@mui/material';
import { Edit, Delete, Inventory as InventoryIcon } from '@mui/icons-material';
import AdminSidebar from './AdminSidebar';
import API from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setAllVegetables } from '../../redux/vegetableSlice';
import toast from 'react-hot-toast';

const Inventory = () => {
    const dispatch = useDispatch();
    const { allVegetables } = useSelector(state => state.vegetable);
    const [loading, setLoading] = useState(true);

    // --- NEW STATES FOR EDIT MODAL ---
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [editInput, setEditInput] = useState({ 
        name: "", description: "", price: 0, stock: 0, weight: "" 
    });

    // FETCH DATA FROM BACKEND
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await API.get("/vegetable/get");
                if (res.data.success) {
                    dispatch(setAllVegetables(res.data.vegetables));
                }
            } catch (error) {
                console.error(error);
                toast.error("Could not load inventory");
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, [dispatch]);

    // DELETE HANDLER
    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const res = await API.delete(`/vegetable/delete/${id}`); 
                if (res.data.success) {
                    toast.success(res.data.message);
                    const updatedVegetables = allVegetables.filter((item) => item._id !== id);
                    dispatch(setAllVegetables(updatedVegetables));
                }
            } catch (error) {
                console.error("Delete Error:", error);
                toast.error(error.response?.data?.message || "Failed to delete product");
            }
        }
    };

    // --- EDIT HANDLERS ---
    const handleEditClick = (item) => {
        setSelectedId(item._id);
        setEditInput({
            name: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock,
            weight: item.weight
        });
        setOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const res = await API.put(`/vegetable/update/${selectedId}`, editInput);
            if (res.data.success) {
                toast.success("Product updated!");
                const updatedData = allVegetables.map(item => 
                    item._id === selectedId ? { ...item, ...editInput } : item
                );
                dispatch(setAllVegetables(updatedData));
                setOpen(false);
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
            <AdminSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 6 } }}>
                <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <InventoryIcon sx={{ fontSize: 40, color: '#ff3d00' }} /> 
                        Stock <span style={{ color: '#ff3d00' }}>Management</span>
                    </Typography>
                    
                    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#fdfdfd' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Stock</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>Unit</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allVegetables.map((item) => (
                                    <TableRow key={item._id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar src={item.image} variant="rounded" sx={{ width: 50, height: 50 }} />
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={item.category} size="small" sx={{ textTransform: 'capitalize' }} />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>₹{item.price}</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={item.stock > 10 ? item.stock : `Low: ${item.stock}`} 
                                                color={item.stock > 10 ? "success" : "error"} 
                                                variant="outlined"
                                                size="small" 
                                            />
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'uppercase', color: 'text.secondary', fontSize: '0.8rem' }}>
                                            {item.weight}
                                        </TableCell>
                                        <TableCell align="right">
                                            {/* Wired Edit Button */}
                                            <IconButton color="primary" onClick={() => handleEditClick(item)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => deleteHandler(item._id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            {/* EDIT MODAL DIALOG */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 800 }}>Edit <span style={{ color: '#ff3d00' }}>Product</span></DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField label="Product Name" fullWidth value={editInput.name} onChange={(e) => setEditInput({...editInput, name: e.target.value})} />
                        <TextField label="Price (₹)" type="number" fullWidth value={editInput.price} onChange={(e) => setEditInput({...editInput, price: e.target.value})} />
                        <TextField label="Stock Quantity" type="number" fullWidth value={editInput.stock} onChange={(e) => setEditInput({...editInput, stock: e.target.value})} />
                        <TextField label="Weight/Unit" fullWidth value={editInput.weight} onChange={(e) => setEditInput({...editInput, weight: e.target.value})} />
                        <TextField label="Description" multiline rows={3} fullWidth value={editInput.description} onChange={(e) => setEditInput({...editInput, description: e.target.value})} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" sx={{ bgcolor: '#ff3d00', '&:hover': { bgcolor: '#e63600' } }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Inventory;