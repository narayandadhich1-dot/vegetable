import React, { useState } from 'react';
import { 
    Box, TextField, Button, Typography, Paper, Container, 
    InputAdornment, IconButton, CircularProgress, Alert,
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff, Email, LockOpen } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setAuthUser } from '../redux/authSlice'; 

const Login = () => {
    const [input, setInput] = useState({ 
        email: "", 
        password: "", 
        role: "customer" 
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    
    const { loading } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            setError("");
            const res = await API.post("/user/login", input);
            
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user)); 
                navigate("/");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Invalid credentials or role selection.");
        } finally {
            // FIXED: Added missing closing parenthesis here
            dispatch(setLoading(false));
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#ff3d00' }}>
                        Welcome Back
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={submitHandler}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Login As</InputLabel>
                            <Select
                                name="role"
                                value={input.role}
                                label="Login As"
                                onChange={changeEventHandler}
                            >
                                <MenuItem value="customer">Customer</MenuItem>
                                <MenuItem value="admin">Store Admin</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            margin="normal"
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={input.password}
                            onChange={changeEventHandler}
                            margin="normal"
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOpen color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2, py: 1.5, bgcolor: '#ff3d00', '&:hover': { bgcolor: '#e63600' } }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                        </Button>
                    </form>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Don't have an account? {' '}
                        <Link to="/register" style={{ color: '#ff3d00', fontWeight: 600, textDecoration: 'none' }}>
                            Create one
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;