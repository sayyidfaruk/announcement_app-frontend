import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import UserTable from '../components/UserTable';
import { deleteUser, getUsers } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import UserDialog from '../components/UserDialog';

const map = { 1: 'User', 2: 'Admin', 3: 'Super Admin' };

export default function Users() {
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    const fetchData = async (token) => {
        const data = await getUsers(token);
        setUsers(data);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded = jwtDecode(token);
            setRole(decoded.role);
            if (decoded.role !== 3) {
                navigate('/not-authorized');
                return;
            }
            fetchData(token);
        } catch (error) {
            console.error("Invalid token:", error);
            navigate('/login');
        }
    }, [navigate]);

    const handleDelete = async (nrp) => {
        try {
            await deleteUser(nrp);
            setUsers(users.filter(user => user.nrp !== nrp));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleOpenDialog = (user = null) => {
        setIsEditing(!!user);
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };


    const filteredUsers = users.filter(user => {
        const roleText = map[user.roleId]?.toLowerCase() || 'unknown';
        return (
            user.nrp.toLowerCase().includes(searchQuery) ||
            user.name.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery) ||
            roleText.includes(searchQuery)
        )
    });

    return (
        <Layout onSearch={handleSearch} title={"User"} role={role}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <Button
                    size="medium"
                    variant="contained"
                    startIcon={<Add />}
                    color="primary"
                    sx={{
                        borderRadius: '13px',
                        textTransform: 'none',
                    }}
                    onClick={() => handleOpenDialog()}
                >
                    User Baru
                </Button>
            </Box>
            <UserTable users={filteredUsers} map={map} handleOpenDialog={handleOpenDialog} setSelectedUser={setSelectedUser} handleDelete={handleDelete} />
            <UserDialog open={openDialog} handleClose={() => setOpenDialog(false)} fetchData={fetchData} isEditing={isEditing} editUser={selectedUser} />
        </Layout>
    )
}
