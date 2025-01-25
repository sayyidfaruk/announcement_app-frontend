import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    IconButton,
} from '@mui/material';
import { DeleteOutlined, EditOutlined, TextSnippetOutlined } from '@mui/icons-material';

function AnnouncementCard({ announcement, role, onDelete, onEdit, onViewDetail }) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '250px', // Tetapkan tinggi tetap untuk kartu
                maxWidth: '300px', // Batas maksimum lebar
                margin: 'auto', // Menjaga kartu tetap di tengah
                borderRadius: 4,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(131, 131, 131, 0.22)',
                overflow: 'hidden', // Hindari konten keluar dari kartu
            }}
        >
            <CardContent
                sx={{
                    flex: 1,
                    padding: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Judul */}
                <Typography
                    variant="h6"
                    color='#2462EA'
                    fontWeight={600}
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
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
                    sx={{ marginBottom: 1 }}
                >
                    Dibuat {new Date(announcement.updatedAt).toLocaleString('id-ID')}
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
                        WebkitLineClamp: 3,
                    }}
                >
                    {announcement.content.length > 120
                        ? `${announcement.content.substring(0, 120)}...`
                        : announcement.content}
                </Typography>
            </CardContent>

            {/* Tombol */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2,
                }}
            >
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<TextSnippetOutlined />}
                    onClick={() => onViewDetail(announcement)}
                    sx={{
                        borderRadius: '13px',
                        textTransform: 'none',
                        color: theme => theme.palette.grey[700],
                        borderColor: theme => theme.palette.grey[400],
                        '&:hover': {
                            borderColor: theme => theme.palette.grey[400],
                        },
                    }}
                >
                    Lihat Detail
                </Button>
                {(role === 2 || role === 3) && (
                    <Box>
                        <IconButton
                            edge="end"
                            sx={{
                                borderRadius: '13px',
                                marginLeft: { xs: 'auto', sm: 2 },
                                padding: '8px',
                            }}
                            onClick={() => onEdit(announcement)}>
                            <EditOutlined />
                        </IconButton>
                        <IconButton
                            edge="end"
                            sx={{
                                borderRadius: '13px',
                                marginLeft: { xs: 'auto', sm: 2 },
                                padding: '8px',
                            }}
                            onClick={() => onDelete(announcement.id)}>
                            <DeleteOutlined />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Card>
    );
}

export default AnnouncementCard;
