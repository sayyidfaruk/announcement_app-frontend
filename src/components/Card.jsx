import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete, Edit, MoreVert } from '@mui/icons-material';

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
        <Card elevation={3} sx={{ mb: 2, position: 'relative' }}>
            <CardContent>
                <Typography variant="h6">{announcement.title}</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
                    {announcement.content}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                    Oleh: {announcement.User.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {new Date(announcement.updatedAt).toLocaleString()}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/announcements/view/${announcement.id}`)}
                    sx={{ marginLeft: 1, marginBottom: 1 }}
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
                    <MoreVert />
                </IconButton>
            )}

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => onEdit(announcement)}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
}


export default AnnouncementCard;
