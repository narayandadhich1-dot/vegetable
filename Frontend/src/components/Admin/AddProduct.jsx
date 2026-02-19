import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, MenuItem, Alert, Stack } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import API from '../../services/api';

const AddProduct = () => {
    const [input, setInput] = useState({ 
        name: "", 
        description: "", 
        price: "", 
        category: "chopped-veg", 
        weight: "kg",   // CHANGED FROM 'unit' TO 'weight' TO MATCH BACKEND
        stock: "",  
        file: null 
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", msg: "" });

    const units = ["kg", "g", "pcs", "litre", "packet", "box"];

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file: file });
            setStatus({ type: "", msg: "" }); 
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Match the exact field names your Controller is expecting
        const formData = new FormData();
        formData.append("name", input.name);
formData.append("description", input.description);
formData.append("price", input.price);
formData.append("category", input.category);
formData.append("weight", input.weight); // Must be 'weight', not 'unit'
formData.append("stock", input.stock);
formData.append("file", input.file); // Must be 'file' to match multer

        try {
            setLoading(true);
            setStatus({ type: "", msg: "" });
            
            const res = await API.post("/vegetable/add", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            
            if (res.data.success) {
                setStatus({ type: "success", msg: "TOMATO GRAVY launched successfully!" });
                setInput({ name: "", description: "", price: "", category: "chopped-veg", weight: "kg", stock: "", file: null });
            }
        } catch (error) {
            setStatus({ 
                type: "error", 
                msg: error.response?.data?.message || "Check console for specific field errors." 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
            <AdminSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, md: 6 } }}>
                <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        Kitchen <span style={{ color: '#ff3d00' }}>Stock Entry</span>
                    </Typography>

                    <Paper elevation={0} sx={{ p: 4, mt: 3, borderRadius: 5, border: '1px solid rgba(0,0,0,0.08)' }}>
                        {status.msg && <Alert severity={status.type} sx={{ mb: 3, borderRadius: 3 }}>{status.msg}</Alert>}
                        
                        <form onSubmit={submitHandler}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Product Name</Typography>
                                    <TextField fullWidth name="name" value={input.name} onChange={changeEventHandler} required />
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Category</Typography>
                                    <TextField fullWidth select name="category" value={input.category} onChange={changeEventHandler}>
                                        <MenuItem value="chopped-veg">Chopped Vegetables</MenuItem>
                                        <MenuItem value="gourmet-gravy">Gourmet Gravies</MenuItem>
                                        <MenuItem value="peeled-fruit">Peeled Fruits</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Price (₹)</Typography>
                                    <TextField fullWidth type="number" name="price" value={input.price} onChange={changeEventHandler} required />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Unit (Weight)</Typography>
                                    <TextField fullWidth select name="weight" value={input.weight} onChange={changeEventHandler}>
                                        {units.map((u) => <MenuItem key={u} value={u}>{u.toUpperCase()}</MenuItem>)}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Available Stock</Typography>
                                    <TextField fullWidth type="number" name="stock" value={input.stock} onChange={changeEventHandler} required />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Product Image</Typography>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<CloudUpload />}
                                            sx={{ borderRadius: 3, borderColor: '#ff3d00', color: '#ff3d00', fontWeight: 700 }}
                                        >
                                            Upload Image
                                            <input type="file" accept="image/*" hidden onChange={changeFileHandler} />
                                        </Button>
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: input.file ? 'green' : 'red' }}>
                                            {input.file ? `Selected: ${input.file.name}` : "Required *"}
                                        </Typography>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Description</Typography>
                                    <TextField fullWidth multiline rows={3} name="description" value={input.description} onChange={changeEventHandler} required />
                                </Grid>

                                <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
                                    <Button type="submit" variant="contained" disabled={loading} 
                                        sx={{ bgcolor: '#ff3d00', px: 6, py: 1.5, borderRadius: 3, fontWeight: 800, '&:hover': { bgcolor: '#e63600' } }}>
                                        {loading ? "Adding..." : "Launch Product"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default AddProduct;