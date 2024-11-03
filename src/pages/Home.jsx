import React, { useEffect, useState } from 'react';
import { Box, Container, Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import SearchAppBar from '../components/AppBar';
import { Add } from '@mui/icons-material';
import AddAnnouncementDialog from '../components/Dialog';
import { deleteAnnouncement, getAnnouncements } from '../services/announcementService';
import CardList from '../components/CardList';
import SortButton from '../components/SortButton';
import ChangePasswordDialog from '../components/ChangePasswordDialog';

function Home() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editAnnouncement, setEditAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDefaultPassword, setIsDefaultPassword] = useState(false);

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
    setIsDefaultPassword(localStorage.getItem('isDefaultPassword') === 'true');
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

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleSort = (direction) => {
    setAnnouncements(
      [...announcements].sort((a, b) => {
        const dateA = new Date(a['updatedAt']);
        const dateB = new Date(b['updatedAt']);
        return direction === 'Terlama' ? dateA - dateB : dateB - dateA;
      })
    );
  };

  const filteredAnnouncements = announcements.filter(
    announcement =>
      announcement.title.toLowerCase().includes(searchQuery) ||
      announcement.content.toLowerCase().includes(searchQuery) ||
      announcement.User.name.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <SearchAppBar role={role} title={'Pengumuman'} view={false} onSearch={handleSearch} />
      <Container>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SortButton onSort={handleSort} />
        </Box>
        <CardList announcements={filteredAnnouncements} role={role} handleDelete={handleDelete} onEdit={handleClickOpen} />
        {(role === 3 || role === 2) &&
          (<Fab color="primary" aria-label="add" onClick={() => handleClickOpen()} sx={{ position: 'fixed', bottom: 24, right: 24, }}>
            <Add />
          </Fab>)}
        {isDefaultPassword && <ChangePasswordDialog open={true} onClose={() => setIsDefaultPassword(false)} />}
      </Container>
      <AddAnnouncementDialog open={open} handleClose={handleClose} fetchData={fetchData} isEditing={isEditing} editAnnouncement={editAnnouncement} />
    </>
  );
}


export default Home;
