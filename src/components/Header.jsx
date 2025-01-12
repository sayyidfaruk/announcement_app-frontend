import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, InputBase, Menu, MenuItem } from '@mui/material';
import { Search, PersonOutlineOutlined, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Header({ toggleSidebar, onSearch, title, role }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isDefaultPassword');
        navigate('/login');
        handleMenuClose();
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'white',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                borderBottom: '1px solid #E0E0E0',
                zIndex: 1201,
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: {sm: 'space-between', xs: 'center'},
                    padding: '0 16px',
                }}
            >
                <Box display={'flex'} alignItems={'center'}>
                    {/* Tombol untuk toggle sidebar */}
                    {role === 3 && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleSidebar}
                            sx={{ marginRight: { xs: 0, sm: 2 } }}
                        >
                            <MenuIcon sx={{ color: '#424242' }} />
                        </IconButton>
                    )}

                    {/* Judul - Hanya ditampilkan di layar besar */}
                    <Typography
                        variant="h6"
                        component="div"
                        color="text.primary"
                        fontWeight="bold"
                        sx={{ display: { xs: 'none', sm: 'block' } }} // Sembunyikan di layar kecil
                    >
                        {title}
                    </Typography>
                </Box>

                <Box display={'flex'}  alignItems={'center'} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                    {/* Search Bar */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#F5F5F5',
                            padding: '4px 8px',
                            borderRadius: '15px',
                            maxWidth: '300px',
                            width: '100%',
                        }}
                    >
                        <Search sx={{ color: '#9E9E9E', marginRight: '8px' }} />
                        <InputBase
                            placeholder="Cari..."
                            onChange={(e) => onSearch(e.target.value)}
                            sx={{ width: '100%', fontSize: '14px' }}
                        />
                    </Box>

                    {/* Ikon Akun */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        sx={{
                            borderRadius: '15px',
                            marginLeft: { xs: 'auto', sm: 2 },
                            padding: '8px',
                        }}
                        onClick={handleMenuOpen}
                    >
                        <PersonOutlineOutlined sx={{ color: '#424242' }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        slotProps={{
                            paper: {
                                sx: {
                                    borderRadius: '12px',
                                },
                            },
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
