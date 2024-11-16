import React, { useEffect, useState } from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, Container, TextField, Slide } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { addAnnouncement, editAnnouncement as updateAnnouncement } from '../services/announcementService';
import { useDropzone } from 'react-dropzone';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAnnouncementDialog({ open, handleClose, fetchData, isEditing, editAnnouncement }) {
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

    const onDrop = (acceptedFiles) => {
        const pdfFile = acceptedFiles.find(file => file.type === 'application/pdf');

        if (pdfFile) {
            setFile(pdfFile);
        } else {
            alert('Hanya menerima file PDF');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'application/pdf': [] },
        onDrop
    });

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {isEditing ? 'Edit Announcement' : 'Add Announcement'}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ py: 4 }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={announcement.title}
                    onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                />
                <TextField
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={10}
                    margin="normal"
                    value={announcement.content}
                    onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                />
                <div {...getRootProps()}
                    style={{
                        border: '2px dashed #ccc',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginTop: '16px',
                        borderRadius: '4px'
                    }}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <Typography variant="body2" color="primary">
                            Drop the file here...
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Drag & drop a PDF file here, or click to select one
                        </Typography>
                    )}
                    {file && <Typography mt={2} variant="body2" color="textSecondary">{file.name}</Typography>}
                </div>
            </Container>
        </Dialog>
    );
}
