import React, { useState } from 'react';
import { 
    Box, TextField, Button, Typography, Paper, Container, 
    InputAdornment, IconButton, CircularProgress, Alert,
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff, Email, LockOpen, Person, Phone } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "customer" // Default role
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
            const res = await API.post("/user/register", input);
            
            if (res.data.success) {
                navigate("/login");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed. Try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                        Create Account
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                        Join FreshVeggies to start shopping organic
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={submitHandler}>
                        <TextField
                            fullWidth label="Full Name" name="fullname"
                            value={input.fullname} onChange={changeEventHandler}
                            margin="normal" required
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Person color="action" /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth label="Email Address" name="email"
                            value={input.email} onChange={changeEventHandler}
                            margin="normal" required
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth label="Phone Number" name="phoneNumber"
                            value={input.phoneNumber} onChange={changeEventHandler}
                            margin="normal" required
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Phone color="action" /></InputAdornment>,
                            }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Register As</InputLabel>
                            <Select
                                name="role"
                                value={input.role}
                                label="Register As"
                                onChange={changeEventHandler}
                            >
                                <MenuItem value="customer">Customer</MenuItem>
                                <MenuItem value="admin">Store Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth label="Password" name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={input.password} onChange={changeEventHandler}
                            margin="normal" required
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockOpen color="action" /></InputAdornment>,
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
                            type="submit" fullWidth variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', fontWeight: 600, borderRadius: 2 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                        </Button>
                    </form>

                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        Already have an account? {' '}
                        <Link to="/login" style={{ color: '#2e7d32', fontWeight: 600, textDecoration: 'none' }}>
                            Sign In
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Signup;