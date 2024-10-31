// UserDialog.jsx
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
    MenuItem,
} from '@mui/material';
import { addUser } from '../services/userService';

function UserDialog({ open, handleClose, fetchData, isEditing, editUser }) {
    const [formData, setFormData] = useState({
        nrp: '',
        name: '',
        password: '',
        email: '',
        roleId: 1,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (open) {
            console.log(editUser);
            if (isEditing && editUser) {
                setFormData({
                    nrp: editUser.nrp,
                    name: editUser.name,
                    password: '',  // Kosongkan field password untuk edit
                    email: editUser.email,
                    roleId: editUser.roleId,
                });
                setError(null);
            } else {
                // Kosongkan form jika add user
                setFormData({
                    nrp: '',
                    name: '',
                    password: '',
                    email: '',
                    roleId: 1,
                });
                setError(null);
            }
        }
    }, [open, isEditing, editUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                // await updateUser(editUser.nrp, formData);
                console.log('edit bro');
            } else {
                await addUser(formData);
            }
            fetchData();
            handleClose();
        } catch (error) {
            setError(error.response?.data?.message || 'Operation failed');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="NRP"
                    name="nrp"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.nrp}
                    onChange={handleChange}
                    required
                    disabled={isEditing}  // Disable field NRP saat edit
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
                    required={!isEditing}
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default UserDialog;
