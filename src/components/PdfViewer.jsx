import React from 'react';
import { Box } from '@mui/material';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PdfViewer({ file }) {
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

    return (
        <Box
            className='viewer-container'
            display="flex"
            justifyContent="center"
            height="100vh"
            width="100%"
            maxWidth="900px"
            margin="auto"
        >
            <Viewer fileUrl={baseUrl + file} plugins={[defaultLayoutPluginInstance]} />
        </Box>
    )
}

export default PdfViewer;
