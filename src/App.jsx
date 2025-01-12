import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Worker } from '@react-pdf-viewer/core';
import './app.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';
import NotAuthorized from './pages/NotAuthorized';
import Announcements from './pages/Announcements';
import Users from './pages/Users';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/not-authorized" element={<NotAuthorized />} />
                        <Route path="/" element={<Announcements />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                </Router>
            </Worker>
        </ThemeProvider>
    );
}

export default App;