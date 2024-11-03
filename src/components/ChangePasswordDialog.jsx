import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, DialogContentText } from '@mui/material';
import { changePassword } from '../services/userService';

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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Ganti Password</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">Password berhasil diubah!</Alert>}
                <DialogContentText>
                    Password Anda masih default, segera ganti untuk keamanan akun anda.
                </DialogContentText>
                <TextField
                    label="Password Baru"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleChangePassword} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangePasswordDialog;
