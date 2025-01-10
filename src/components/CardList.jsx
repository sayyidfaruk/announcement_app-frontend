import React from 'react';
import { Box } from '@mui/material';
import AnnouncementCard from './Card';

function CardList({ announcements, role, handleDelete, onEdit }) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Lebar kartu maksimal
                gap: 2, // Gap antar-kartu (horizontal dan vertikal)
                justifyContent: 'center',
                p: 2,
            }}
        >
            {announcements.map((announcement) => (
                <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                    role={role}
                    onDelete={handleDelete}
                    onEdit={onEdit}
                />
            ))}
        </Box>
    );
}

export default CardList;
