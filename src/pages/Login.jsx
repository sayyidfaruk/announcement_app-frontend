import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, Box, Paper } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { LocalPolice } from '@mui/icons-material';

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

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };


    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Paper elevation={3} sx={{ padding: 5}}>
                    <Box display='flex' alignItems="center" gap={1} marginBottom={2}>
                        <LocalPolice />
                        <Typography variant='body2'>Polres Garut</Typography>
                    </Box>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '1rem' }}>
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
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
