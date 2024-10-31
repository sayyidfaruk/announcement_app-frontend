import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import ViewAnnouncement from './pages/ViewCard';
import ManageUsers from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/announcements/view/:id" element={<ViewAnnouncement />} />
        <Route path="/users" element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;

