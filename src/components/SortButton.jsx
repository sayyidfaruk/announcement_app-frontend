import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { ArrowDownward, ArrowUpward, Sort } from '@mui/icons-material';
import React, { useState } from 'react';

function SortButton({ onSort }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (type) => {
        onSort(type);
        handleClose();
    };

    return (
        <>
            <Tooltip title="Sort Announcements">
                <IconButton onClick={handleClick} color="primary" sx={{ mt: 1 }}>
                    <Sort fontSize='large' />
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} slotProps={{
                paper: {
                    sx: {
                        borderRadius: '12px',
                    },
                },
            }}>
                <MenuItem onClick={() => handleSort("Terbaru")}>
                    <ListItemIcon>
                        <ArrowUpward fontSize="small" />
                    </ListItemIcon>
                    Terbaru
                </MenuItem>
                <MenuItem onClick={() => handleSort("Terlama")}>
                    <ListItemIcon>
                        <ArrowDownward fontSize="small" />
                    </ListItemIcon>
                    Terlama
                </MenuItem>
            </Menu>
        </>
    );
}

export default SortButton;
