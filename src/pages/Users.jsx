// Users.jsx
import React, { useEffect, useState } from 'react';
import { Container, IconButton, Menu, MenuItem, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import { deleteUser, getUsers } from '../services/userService';
import SearchAppBar from '../components/AppBar';
import UserDialog from '../components/UserDialog'; // Import UserDialog

const map = {
    1: 'User',
    2: 'Admin',
    3: 'Super Admin',
};

function Users() {
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const fetchData = async (token) => {
        const data = await getUsers(token);
        setUsers(data);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.role !== 3) {
                navigate('/not-authorized');
            }
            fetchData(token);
        } else {
            navigate('/login');
        }
    }, [navigate, selectedUser]);

    const handleDelete = async (nrp) => {
        try {
            await deleteUser(nrp);
            setUsers(users.filter(user => user.nrp !== nrp));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleMenuOpen = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePasswordChange = () => {
        console.log('Ubah password untuk:', selectedUser);
        handleMenuClose();
    };

    const handleUserDelete = () => {
        if (selectedUser) {
            handleDelete(selectedUser.nrp);
        }
        handleMenuClose();
    };

    const handleOpenDialog = (user = null) => {
        setIsEditing(!!user); // Set true if editing
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const columns = [
        { field: 'nrp', headerName: 'NRP', flex: 1, minWidth: 100 },
        { field: 'name', headerName: 'Name', flex: 2, minWidth: 150 },
        { field: 'roleId', headerName: 'Role', flex: 1, minWidth: 100, valueGetter: (params) => map[params] || 'Unknown' },
        { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 80,
            renderCell: (params) => (
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, params.row)}
                >
                    <MoreVertIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <><SearchAppBar role={3} title={'Manage Users'} /><Container maxWidth="lg">
            <Box my={3}>
                <Box textAlign='right' mb={3}>
                    <Button variant="outlined" onClick={() => handleOpenDialog()}>Add User</Button>
                </Box>
                <div style={{ height: 'calc(100vh - 300px)', width: '100%' }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        getRowId={(row) => row.nrp}
                        checkboxSelection={false}
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: 'primary.light',
                            },
                            '& .MuiDataGrid-cell': {
                                padding: '8px',
                            },
                        }} />
                </div>

                {/* Menu untuk Ubah Password dan Hapus */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => { handleOpenDialog(selectedUser); handleMenuClose(); }}>Edit User</MenuItem>
                    <MenuItem onClick={handleUserDelete}>Delete User</MenuItem>
                </Menu>
            </Box>
            {/* Dialog untuk Add/Edit User */}
            <UserDialog open={openDialog} handleClose={() => setOpenDialog(false)} fetchData={fetchData} isEditing={isEditing} editUser={selectedUser} />
        </Container></>
    );
}

export default Users;
