import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { getAnnouncementById } from '../services/announcementService';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import SearchAppBar from '../components/AppBar';
import { jwtDecode } from 'jwt-decode';

function ViewAnnouncement() {
    const { id } = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [role, setRole] = useState(null);
    const baseUrl = 'http://localhost:5000/uploads/';
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const decode = jwtDecode(token);
        setRole(decode.role);
        const fetchAnnouncement = async () => {
            const data = await getAnnouncementById(id);
            setAnnouncement(data);
        };
        fetchAnnouncement();
    }, [id]);

    return (
        <><SearchAppBar role={role} title={'Pengumuman'}/><Container>
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
                            <Typography variant="h6">PDF Viewer:</Typography>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                <div
                                    style={{
                                        height: '750px',
                                        width: '900px',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                    }}
                                >
                                    <Viewer fileUrl={baseUrl + announcement.attachment} plugins={[defaultLayoutPluginInstance]} />
                                </div>
                            </Worker>
                        </>
                    ) : (
                        <Typography>No PDF available</Typography>
                    )}
                </>
            ) : (
                <Typography>Loading announcement...</Typography>
            )}
        </Container></>
    );
}

export default ViewAnnouncement;
