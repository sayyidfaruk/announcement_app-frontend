import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, MenuItem, IconButton, Typography, FormLabel, Box } from '@mui/material';
import { addUser, updateUser } from '../services/userService';
import { Clear } from '@mui/icons-material';
import PasswordField from './PasswordField';
import InputForm from './InputForm';

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
        <Dialog open={open} onClose={handleClose} PaperProps={{
            style: { borderRadius: 15 }
        }} fullWidth maxWidth="sm">
            <DialogTitle display={'flex'} justifyContent={'space-between'} alignItems='center'>
                <Typography variant="h6" fontWeight="bold">
                    {isEditing ? 'Edit User' : 'User Baru'}
                </Typography>
                <IconButton
                    edge="end"
                    onClick={handleClose}>
                    <Clear />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box
                    component="form"
                    autoComplete="off"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                    {error && <Alert severity="error">{error}</Alert>}
                    <InputForm name="nrp" placeholder={"NRP"} value={formData.nrp} setValue={handleChange} disabled={isEditing} />
                    <InputForm name="name" placeholder={"Nama"} value={formData.name} setValue={handleChange} />
                    <Box >
                        <FormLabel htmlFor="password" sx={{ color: 'black' }}>Password</FormLabel>
                        <PasswordField password={formData.password} setPassword={handleChange} isEditing={isEditing} isAdd={true} handleSetDefaultPassword={handleSetDefaultPassword} />
                    </Box>
                    <InputForm name="email" placeholder={"Email"} value={formData.email} setValue={handleChange} required={false} type="email" />
                    <Box >
                        <FormLabel htmlFor="roleId" sx={{ color: 'black' }}>Role</FormLabel>
                        <TextField
                            select
                            id="roleId"
                            name="roleId"
                            variant="outlined"
                            size='small'
                            fullWidth
                            margin="dense"
                            value={formData.roleId}
                            onChange={handleChange}
                            required
                            slotProps={{
                                input: {
                                    sx: {
                                        borderRadius: '15px',
                                    },
                                },
                            }}
                        >
                            <MenuItem value={1} >User</MenuItem>
                            <MenuItem value={2} >Admin</MenuItem>
                            <MenuItem value={3} >Super Admin</MenuItem>
                        </TextField>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
                <Button onClick={handleSave} variant="contained" size="medium" sx={{ borderRadius: '13px', textTransform: 'none' }}>{isEditing ? 'Edit User' : 'Buat User'}</Button>
            </DialogActions>
        </Dialog>
    );
}


export default UserDialog;
