import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

function AnnouncementCard({ announcement, role, onDelete, onEdit }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        onDelete(announcement.id);
        handleMenuClose();
    };

    return (
        <Card sx={{ marginY: 2, position: 'relative' }}>
            <CardContent>
                <Typography variant="h6">{announcement.title}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                    {announcement.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Posted by: {announcement.nrp} | Date: {new Date(announcement.createdAt).toLocaleDateString()}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/announcements/view/${announcement.id}`)}
                    sx={{ marginLeft: 1 }}
                >
                    View
                </Button>
            </CardActions>

            {(role === 2 || role === 3) && (
                <IconButton
                    aria-label="more options"
                    onClick={handleMenuOpen}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <MoreVertIcon />
                </IconButton>
            )}

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => onEdit(announcement)}>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
}


export default AnnouncementCard;
