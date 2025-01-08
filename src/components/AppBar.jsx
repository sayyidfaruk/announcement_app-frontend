import * as React from 'react';
import { Menu, MenuItem, Avatar, Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Campaign, ManageAccounts, Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DrawerList from './DrawerList';
import { Search, SearchIconWrapper, StyledInputBase } from '../themes/theme';

export default function SearchAppBar({ role, title, view, onSearch }) {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isDefaultPassword');
        navigate('/login');
        handleClose();
    };

    const menuItems = [
        { text: 'Pengumuman', path: '/', icon: <Campaign /> },
        ...(role === 3 ? [{ text: 'User', path: '/users', icon: <ManageAccounts /> }] : [])
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {role === 3 && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer(true)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {title}
                    </Typography>
                    {!view && (
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Cari…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => onSearch(e.target.value)}
                            />
                        </Search>
                    )}

                    <IconButton onClick={handleAvatarClick} sx={{ ml: {xs: 'auto', sm: 2}  }}>
                        <Avatar />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {role === 3 && <DrawerList drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} menuItems={menuItems} />}
        </Box>
    );
}
