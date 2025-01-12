import React, { useState } from 'react';
import { Button, Container, Alert, Box, Paper, Divider, Typography, FormLabel } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import PasswordField from '../components/PasswordField';
import InputForm from '../components/InputForm';

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
                        src="/div_tik_polri-logo.png"
                        alt="Logo Divisi TIK Polri"
                        style={{ maxWidth: '45%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '12px' }}
                    />
                    <Divider variant="middle" sx={{ mt: 2 }} />
                    {error && <Alert severity="error" sx={{ my: 2, borderRadius: '8px' }}>{error}</Alert>}
                    <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', mt: 2 }}>
                        <InputForm name={'NRP'} placeholder={"NRP"} value={nrp} setValue={(e) => setNrp(e.target.value)}/>
                        <Box sx={{ mt: 2 }} />
                        <FormLabel htmlFor="password" sx={{ color: 'black'}}>Password</FormLabel>
                        <PasswordField password={password} setPassword={setPassword} />
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ cursor: 'pointer', textAlign: 'right', mt: 1 }}
                            onClick={() => window.open(import.meta.env.VITE_CONTACT, '_blank')}
                        >
                            Lupa Password?
                        </Typography>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: '13px', textTransform: 'none' }}>
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
