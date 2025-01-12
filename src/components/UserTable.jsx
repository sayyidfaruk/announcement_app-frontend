import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

const UserTable = ({ users, map, handleOpenDialog, setSelectedUser, handleDelete }) => {

    return (
        <TableContainer component={Paper} style={{
            borderRadius: "15px",
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(131, 131, 131, 0.22)',
            marginTop: "1rem",
        }}>
            <Table>
                <TableHead>
                    <TableRow style={{ backgroundColor: "#F3F7FF" }}>
                        <TableCell><strong style={{ color: "#929292" }}>NRP</strong></TableCell>
                        <TableCell sx={{ width: '30%' }}><strong style={{ color: "#929292" }}>Nama</strong></TableCell>
                        <TableCell><strong style={{ color: "#929292" }}>Role</strong></TableCell>
                        <TableCell><strong style={{ color: "#929292" }}>Email</strong></TableCell>
                        <TableCell sx={{ textAlign: 'right' }}><strong style={{ color: "#929292", paddingRight: 8 }}>Opsi</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell><strong>{user.nrp}</strong></TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                <span
                                    style={{
                                        display: "inline-block",
                                        minWidth: "80px", // Tentukan ukuran minimum untuk lebar
                                        textAlign: "center",
                                        padding: "5px 10px",
                                        borderRadius: "15px",
                                        backgroundColor:
                                            user.roleId === 2
                                                ? "#007bff"
                                                : user.roleId === 3
                                                    ? "#ff0000"
                                                    : "#e0e0e0",
                                        color: user.roleId === 2 || user.roleId === 3 ? "#fff" : "#000",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {map[user.roleId]}
                                </span>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell sx={{ textAlign: 'right' }}>
                                <IconButton
                                    aria-label="edit"
                                    sx={{
                                        borderRadius: '13px',
                                        padding: '8px',
                                    }}
                                    onClick={() => { setSelectedUser(user); handleOpenDialog(user); }}
                                >
                                    <EditOutlined />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    sx={{
                                        borderRadius: '13px',
                                        padding: '8px',
                                    }}
                                    onClick={() => handleDelete(user.nrp)}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
