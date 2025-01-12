import React, { useState, useEffect } from 'react';
import { useMediaQuery, Box, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children, onSearch, title, role }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Deteksi layar kecil
    const [isSidebarVisible, setIsSidebarVisible] = useState(!isSmallScreen);

    useEffect(() => {
        if (isSmallScreen) {
            setIsSidebarVisible(false);
        } else {
            setIsSidebarVisible(role==3);
        }
    }, [isSmallScreen, role]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <Box
                sx={{
                    marginLeft: isSidebarVisible && !isSmallScreen ? '240px' : '0',
                    width: '100%',
                    minHeight: '100vh',
                    backgroundColor: '#FFFFFF',
                    transition: theme.transitions.create('margin-left', {
                        duration: theme.transitions.duration.standard,
                    }),
                }}
            >
                <Header toggleSidebar={toggleSidebar} onSearch={onSearch} title={title} role={role} />
                <Box sx={{ padding: '16px' }}>{children}</Box>
            </Box>
        </Box>
    );
}

export default Layout;
