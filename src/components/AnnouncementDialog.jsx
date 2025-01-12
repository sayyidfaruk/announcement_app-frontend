import { Clear } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputForm from './InputForm'
import FileUpload from './FileUpload';
import { addAnnouncement, editAnnouncement as updateAnnouncement } from '../services/announcementService';

export default function AnnouncementDialog({ open, handleClose, fetchData, isEditing, editAnnouncement }) {
    const [announcement, setAnnouncement] = useState({ title: '', content: '' });
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (isEditing && editAnnouncement) {
            setAnnouncement({
                title: editAnnouncement.title,
                content: editAnnouncement.content,
            });
        } else {
            setAnnouncement({ title: '', content: '' });
            setFile(null);
        }
    }, [isEditing, editAnnouncement]);    

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('title', announcement.title);
            formData.append('content', announcement.content);
            if (file) formData.append('file', file);

            if (isEditing) {
                await updateAnnouncement(editAnnouncement.id, formData);
            } else {
                await addAnnouncement(formData);
            }

            fetchData();
            setAnnouncement({ title: '', content: '' });
            setFile(null);
            handleClose();
        } catch (error) {
            console.error('Failed to save announcement:', error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                style: { borderRadius: 15 }
            }}
        >
            <DialogTitle display={'flex'} justifyContent={'space-between'} alignItems='center'>
                <Typography variant="h6" fontWeight="bold">
                    {isEditing ? 'Edit Pengumuman' : 'Pengumuman Baru'}
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
                    noValidate
                    autoComplete="off"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                    <InputForm name="Judul" placeholder="Judul" value={announcement.title} setValue={(e) => setAnnouncement({ ...announcement, title: e.target.value })} />
                    <InputForm
                        name="Deskripsi"
                        placeholder="Deskripsi"
                        value={announcement.content}
                        setValue={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                        multiline
                        rows={4}
                    />
                    <FileUpload value={file} setValue={setFile} />
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={handleSave} variant="contained" size="medium" sx={{ borderRadius: '13px', textTransform: 'none' }}>{isEditing ? 'Edit Pengumuman' : 'Buat Pengumuman'}</Button>
            </DialogActions>
        </Dialog>
    )
}
