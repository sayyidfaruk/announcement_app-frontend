import React, { useState } from 'react';
import { TextField, Button, Container, Alert, Box, Paper, Divider } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [nrp, setNrp] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { nrp, password });
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            password === import.meta.env.VITE_DEFAULT_PASS ? localStorage.setItem('isDefaultPassword', true): localStorage.setItem('isDefaultPassword', false)

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
                <Paper elevation={3} sx={{ padding: 5 }}>
                    <img
                        src="/div_tik_polri-logo.jpeg"
                        alt="Logo Divisi TIK Polri"
                        style={{ maxWidth: '50%', height: 'auto', display: 'block', margin: '0 auto' }}
                    />
                    <Divider variant="middle" sx={{ mt: 2 }} />
                    {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
                    <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', mt: 2 }}>
                        <TextField
                            label="NRP"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={nrp}
                            onChange={(e) => setNrp(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
