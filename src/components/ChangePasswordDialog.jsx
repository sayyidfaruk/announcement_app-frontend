import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, DialogContentText, Typography, IconButton } from '@mui/material';
import { changePassword } from '../services/userService';
import { Clear } from '@mui/icons-material';

function ChangePasswordDialog({ open, onClose }) {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChangePassword = async () => {
        try {
            await changePassword(newPassword);
            setSuccess(true);
            setError(null);
            localStorage.setItem('isDefaultPassword', false);
            setNewPassword('');
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal mengubah password');
            setSuccess(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                style: { borderRadius: 15 }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold">
                    Ganti Password
                </Typography>
                <IconButton
                    edge="end"
                    onClick={onClose}>
                    <Clear />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pb: 1 }}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">Password berhasil diubah!</Alert>}
                <DialogContentText>
                    Password Anda masih default, segera ganti untuk keamanan akun anda.
                </DialogContentText>
                <TextField
                    label="Password Baru"
                    type="password"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
                />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
                <Button onClick={handleChangePassword} variant="contained" size="large" sx={{ borderRadius: '13px', textTransform: 'none' }}>Simpan</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangePasswordDialog;
