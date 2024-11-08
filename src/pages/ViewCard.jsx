import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { getAnnouncementById } from '../services/announcementService';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import SearchAppBar from '../components/AppBar';
import { jwtDecode } from 'jwt-decode';

function ViewAnnouncement() {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL_FILES;

    const transform = (slot) => ({
        ...slot,
        Download: () => null,
        DownloadMenuItem: () => null,
        Print: () => null,
        Open: () => null,
        SwitchTheme: () => null,
    });
    
    const renderToolbar = (Toolbar) => (
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => [
            defaultTabs[0],
            defaultTabs[1],
        ],
        renderToolbar
    });

    const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance;

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        
        if (token) {
            const decode = jwtDecode(token);
            setRole(decode.role);
        } else {
            navigate('/login');
        }
    }, [navigate]);
    
    useEffect(() => {
        const fetchAnnouncement = async () => {
            const data = await getAnnouncementById(id);
            setAnnouncement(data);
        };
    
        if (role === 1 || role === 2 || role === 3) {
            fetchAnnouncement();
        } else if (role !== null) {
            navigate('/not-authorized');
        }
    }, [role, id, navigate]);    

    return (
        <>
            <SearchAppBar role={role} title={'Pengumuman'} view={true} />
            <Container maxWidth="md">
                {announcement ? (
                    <>
                        <Typography variant="h4" marginTop={5} gutterBottom>
                            {announcement.title}
                        </Typography>
                        <Typography variant="body1">
                            {announcement.content}
                        </Typography>

                        {announcement.attachment ? (
                            <>
                                <Typography variant="h6" marginTop={3} marginBottom={2}>
                                    PDF Viewer:
                                </Typography>
                                <Box
                                    className='viewer-container'
                                    display="flex"
                                    justifyContent="center"
                                    height="100vh"
                                    width="100%"
                                    maxWidth="900px"
                                    margin="auto"
                                >
                                    <Viewer fileUrl={baseUrl + announcement.attachment} plugins={[defaultLayoutPluginInstance]} />
                                </Box>
                            </>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No PDF available
                            </Typography>
                        )}
                    </>
                ) : (
                    <Typography>Loading announcement...</Typography>
                )}
            </Container>
        </>
    );
}

export default ViewAnnouncement;
