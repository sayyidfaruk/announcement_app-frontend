import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotAuthorized() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                textAlign="center"
            >
                <Typography variant="h4" color="error" gutterBottom>
                    Akses Ditolak
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Anda tidak memiliki izin yang diperlukan untuk melihat halaman ini.
                </Typography>
                <Box mt={4}>
                    <Button variant="contained" color="primary" size='large' onClick={handleGoBack} sx={{ borderRadius: '10px', textTransform: 'none', mr: 1 }}>
                        Menuju Beranda
                    </Button>
                    <Button variant="outlined" color="primary" size='large' sx={{ borderRadius: '10px', textTransform: 'none' }} onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default NotAuthorized;
