import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function AnnouncementCard({ announcement, role, onDelete, onEdit }) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                aspectRatio: '3 / 2', // Rasio aspek (lebar:tinggi)
                padding: 0, // Menghilangkan padding default
            }}
        >
            <CardContent
                sx={{
                    padding: 2, // Padding konten dalam kartu
                    flexGrow: 1, // Membuat konten memenuhi ruang vertikal
                }}
            >
                {/* Judul */}
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2, // Membatasi maksimal 2 baris
                    }}
                >
                    {announcement.title.length > 50
                        ? `${announcement.title.substring(0, 50)}...`
                        : announcement.title}
                </Typography>

                {/* Tanggal Dibuat */}
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', marginBottom: 1 }}
                >
                    Dibuat {new Date(announcement.createdAt).toLocaleDateString('id-ID')}
                </Typography>

                {/* Deskripsi */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3, // Membatasi maksimal 3 baris
                    }}
                >
                    {announcement.content.length > 100
                        ? `${announcement.content.substring(0, 100)}...`
                        : announcement.content}
                </Typography>
            </CardContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2,
                }}
            >
                <Button size="small">Lihat Detail</Button>
                {role >= 2 && (
                    <Box>
                        <IconButton onClick={() => onEdit(announcement)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDelete(announcement.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Card>
    );
}

export default AnnouncementCard;
