import React, { useEffect, useState } from 'react';
import { Container, IconButton, Menu, MenuItem, Box, Fab, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Delete, Edit, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import { deleteUser, getUsers } from '../services/userService';
import SearchAppBar from '../components/AppBar';
import UserDialog from '../components/UserDialog';

const map = { 1: 'User', 2: 'Admin', 3: 'Super Admin' };

function Users() {
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
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
            if (decoded.role !== 3) {
                navigate('/not-authorized');
                return;
            }
            fetchData(token);
        } catch (error) {
            console.error("Invalid token:", error);
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

    const handleUserDelete = () => {
        if (selectedUser) {
            handleDelete(selectedUser.nrp);
        }
        handleMenuClose();
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
        <>
            <SearchAppBar role={3} title={'Manage User'} view={false} onSearch={handleSearch} />
            <Container maxWidth="lg">
                <Box my={3}>
                    <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
                        <DataGrid
                            rows={filteredUsers}
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

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => { handleOpenDialog(selectedUser); handleMenuClose(); }}>
                            <ListItemIcon>
                                <Edit fontSize="small" />
                            </ListItemIcon>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleUserDelete}>
                            <ListItemIcon>
                                <Delete fontSize="small" />
                            </ListItemIcon>
                            Delete
                        </MenuItem>
                    </Menu>
                </Box>
                <UserDialog open={openDialog} handleClose={() => setOpenDialog(false)} fetchData={fetchData} isEditing={isEditing} editUser={selectedUser} />
            </Container>
            <Fab color="primary" aria-label="add" onClick={() => handleOpenDialog()} sx={{ position: 'fixed', bottom: 24, right: 24, }}>
                <Add />
            </Fab>
        </>
    );
}

export default Users;
