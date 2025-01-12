import React, { useEffect, useState } from 'react';
import { deleteAnnouncement, getAnnouncements } from '../services/announcementService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Box, Button } from '@mui/material';
import SortButton from '../components/SortButton';
import { Add } from '@mui/icons-material';
import CardList from '../components/CardList';
import AnnouncementDialog from '../components/AnnouncementDialog';
import ChangePasswordDialog from '../components/ChangePasswordDialog';
import AnnouncementView from '../components/AnnouncementView';

function Announcements() {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editAnnouncement, setEditAnnouncement] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDefaultPassword, setIsDefaultPassword] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

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
        const sortedData = data.sort((a, b) => new Date(b['updatedAt']) - new Date(a['updatedAt']));
        setAnnouncements(sortedData);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decode = jwtDecode(token);
            setRole(decode.role);
            setIsDefaultPassword(localStorage.getItem('isDefaultPassword') === 'true');
            fetchData();
        } catch (error) {
            console.error("Invalid token:", error);
            navigate('/login');
        }
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

    const handleViewDetail = (announcement) => {
        setSelectedAnnouncement(announcement); // Set pengumuman yang dipilih
    };

    return (
        <Layout onSearch={handleSearch} title={"Pengumuman"} role={role}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <SortButton onSort={handleSort} />
                {(role === 2 || role === 3) && (
                    <Button
                        size="medium"
                        variant="contained"
                        startIcon={<Add />}
                        color="primary"
                        sx={{
                            borderRadius: '13px',
                            textTransform: 'none',
                        }}
                        onClick={() => handleClickOpen(null)}
                    >
                        Pengumuman Baru
                    </Button>
                )}
            </Box>
            <CardList announcements={filteredAnnouncements} role={role} handleDelete={handleDelete} onEdit={handleClickOpen} onViewDetail={handleViewDetail} />

            <AnnouncementDialog open={open} handleClose={handleClose} fetchData={fetchData} isEditing={isEditing} editAnnouncement={editAnnouncement} />
            {isDefaultPassword && <ChangePasswordDialog open={true} onClose={() => setIsDefaultPassword(false)} />}
            <AnnouncementView selectedAnnouncement={selectedAnnouncement} setSelectedAnnouncement={setSelectedAnnouncement} />
        </Layout>
    );
}

export default Announcements;
