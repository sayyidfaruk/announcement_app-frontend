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
                    Access Denied
                </Typography>
                <Typography variant="body1" gutterBottom>
                    You do not have the necessary permissions to view this page.
                </Typography>
                <Box mt={4}>
                    <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ mr: 2 }}>
                        Go to Home
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default NotAuthorized;
