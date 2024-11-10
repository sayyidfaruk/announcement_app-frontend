import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, MenuItem, IconButton } from '@mui/material';
import { addUser, updateUser } from '../services/userService';
import { Replay } from '@mui/icons-material';
import PasswordField from './PasswordField';

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
                    password: '',
                    email: editUser.email,
                    roleId: editUser.roleId,
                });
                setError(null);
            } else {
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

    const handleSetDefaultPassword = () => {
        const defaultPassword = import.meta.env.VITE_DEFAULT_PASS;
        setFormData((prevData) => ({
            ...prevData,
            password: defaultPassword,
        }));
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                await updateUser(formData);
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
                    disabled={isEditing} 
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PasswordField password={formData.password} setPassword={handleChange} isEditing={isEditing} isAdd={true} />
                    <IconButton onClick={handleSetDefaultPassword} color="primary" >
                        <Replay />
                    </IconButton>
                </div>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
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
                <Button onClick={handleClose} color='secondary'>Cancel</Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default UserDialog;
