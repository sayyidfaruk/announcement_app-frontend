import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import ViewAnnouncement from './pages/ViewCard';
import ManageUsers from './pages/Users';
import { Worker } from '@react-pdf-viewer/core';
import './app.css'
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/announcements/view/:id" element={<ViewAnnouncement />} />
            <Route path="/users" element={<ManageUsers />} />
          </Routes>
        </Router>
      </Worker>
    </ThemeProvider>
  );
}

export default App;

