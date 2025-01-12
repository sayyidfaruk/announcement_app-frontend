import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { NotificationsNoneRounded, PeopleOutlineRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar({ isSidebarVisible, toggleSidebar }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeMenu, setActiveMenu] = useState('pengumuman'); // Lacak menu yang aktif
    const sidebarRef = useRef(null); // Refrensi untuk sidebar

    useEffect(() => {
        // Set active menu berdasarkan lokasi URL
        const currentPath = location.pathname;
        if (currentPath === '/users') {
            setActiveMenu('users');
        } else {
            setActiveMenu('pengumuman');
        }
    }, [location.pathname]); // Jalankan setiap kali path berubah

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isSmallScreen &&
                isSidebarVisible &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                toggleSidebar();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSmallScreen, isSidebarVisible, toggleSidebar]);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu); // Tandai menu yang aktif

        if (isSmallScreen) {
            toggleSidebar(); // Tutup sidebar otomatis di layar kecil
        }
    };

    return (
        <Box
            ref={sidebarRef}
            sx={{
                width: '240px',
                height: '100vh',
                backgroundColor: '#F3F7FF',
                display: isSidebarVisible ? 'flex' : 'none',
                flexDirection: 'column',
                borderRight: '1px solid #E0E0E0',
                position: 'fixed',
                transition: (theme) =>
                    theme.transitions.create('transform', {
                        duration: theme.transitions.duration.standard,
                    }),
                transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
                zIndex: 1200,
            }}
        >
            {/* Logo */}
            <Box sx={{ pt: '3rem', pb: '1rem', textAlign: 'center' }}>
                <img
                    src="div_tik_polri-logo.png" // Ganti dengan URL logo Anda
                    alt="Logo"
                    style={{ maxWidth: '100px', marginBottom: '8px' }}
                />
            </Box>
            <Divider />

            {/* Menu */}
            <List sx={{ padding: 1 }}>
                <ListItemButton
                    selected={activeMenu === 'pengumuman'}
                    onClick={() => {
                        handleMenuClick('pengumuman');
                        navigate('/');
                    }}
                    sx={{
                        mb: 1,
                        borderRadius: '15px',
                        backgroundColor: activeMenu === 'pengumuman' ? '#2462EA' : 'transparent',
                        color: activeMenu === 'pengumuman' ? '#FFFFFF' : '#000000',
                        '&:hover': {
                            backgroundColor: activeMenu === 'pengumuman' ? '#1E4CB3' : '#E3F2FD',
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: activeMenu === 'pengumuman' ? '#FFFFFF' : '#000000',
                        }}
                    >
                        <NotificationsNoneRounded />
                    </ListItemIcon>
                    <ListItemText primary="Pengumuman" />
                </ListItemButton>

                <ListItemButton
                    selected={activeMenu === 'users'}
                    onClick={() => {
                        handleMenuClick('users');
                        navigate('/users');
                    }}
                    sx={{
                        mb: 1,
                        borderRadius: '15px',
                        backgroundColor: activeMenu === 'users' ? '#2462EA' : 'transparent',
                        color: activeMenu === 'users' ? '#FFFFFF' : '#000000',
                        '&:hover': {
                            backgroundColor: activeMenu === 'users' ? '#1E4CB3' : '#E3F2FD',
                        },
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: activeMenu === 'users' ? '#FFFFFF' : '#000000',
                        }}
                    >
                        <PeopleOutlineRounded />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                </ListItemButton>
            </List>
        </Box>
    );
}

export default Sidebar;
