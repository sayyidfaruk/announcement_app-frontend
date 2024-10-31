import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, MenuItem, Typography } from '@mui/material';
import { addUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AddUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nrp: '',
        name: '',
        password: '',
        email: '',
        roleId: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.role !== 3) {
                navigate('/not-authorized');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(formData);
            navigate('/users'); 
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add New User
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="NRP"
                    name="nrp"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.nrp}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    select
                    label="Role"
                    name="roleId"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.roleId}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value={1}>User</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                    <MenuItem value={3}>Super Admin</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary">
                    Add User
                </Button>
            </form>
        </Container>
    );
}

export default AddUser;
