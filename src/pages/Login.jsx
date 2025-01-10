import React, { useState } from 'react';
import { TextField, Button, Container, Alert, Box, Paper, Divider, Typography } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import PasswordField from '../components/PasswordField';

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
            password === import.meta.env.VITE_DEFAULT_PASS ? localStorage.setItem('isDefaultPassword', true) : localStorage.setItem('isDefaultPassword', false)

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
                <Paper elevation={3} sx={{ padding: 5, borderRadius: '16px' }}>
                    <img
                        src="/div_tik_polri-logo.jpeg"
                        alt="Logo Divisi TIK Polri"
                        style={{ maxWidth: '40%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '12px' }}
                    />
                    <Divider variant="middle" sx={{ mt: 2 }} />
                    {error && <Alert severity="error" sx={{ my: 2, borderRadius: '8px' }}>{error}</Alert>}
                    <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', mt: 2 }}>
                        <TextField
                            label="NRP"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={nrp}
                            onChange={(e) => setNrp(e.target.value)}
                            required
                            slotProps={
                                {
                                    input: {
                                        sx: {
                                            borderRadius: '10px',
                                        },
                                    },
                                }
                            }
                        />
                        <PasswordField password={password} setPassword={setPassword} />
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ cursor: 'pointer', textAlign: 'right', mt: 1 }}
                            onClick={() => window.open(import.meta.env.VITE_CONTACT, '_blank')}
                        >
                            Lupa Password?
                        </Typography>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: '8px' }}>
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
