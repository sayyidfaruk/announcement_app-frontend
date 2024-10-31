import React, { useEffect, useState } from 'react';
import { Container, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import SearchAppBar from '../components/AppBar';
import AnnouncementList from '../components/CardList';
import { Add } from '@mui/icons-material';
import AddAnnouncementDialog from '../components/Dialog';
import { deleteAnnouncement, getAnnouncements } from '../services/announcementService';

function Home() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const handleClickOpen = (announcement = null) => {
    setIsEditing(!!announcement); 
    setEditAnnouncement(announcement);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditAnnouncement(null);
  };
  const fetchData = async () => {
    const data = await getAnnouncements();
    setAnnouncements(data);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
    const decode = jwtDecode(token);
    setRole(decode.role);
    fetchData();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id); 
      setAnnouncements(announcements.filter(announcement => announcement.id !== id)); 
    } catch (error) {
      console.error('Failed to delete announcement:', error);
    }
  };

  return (
    <>
      <SearchAppBar role={role} title={'Pengumuman'} />
      <Container>
        <AnnouncementList announcements={announcements} role={role} handleDelete={handleDelete} onEdit={handleClickOpen} />
        {role === 3 &&
          <Fab color="primary" aria-label="add" onClick={() => handleClickOpen()} sx={{ position: 'fixed', bottom: 24, right: 24, }}>
            <Add />
          </Fab>}
      </Container>
      <AddAnnouncementDialog open={open} handleClose={handleClose} fetchData={fetchData} isEditing={isEditing} editAnnouncement={editAnnouncement} />
    </>
  );
}


export default Home;
