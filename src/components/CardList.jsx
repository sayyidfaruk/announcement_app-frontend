import React from 'react';
import { Grid } from '@mui/material';
import AnnouncementCard from './Card';

function CardList({ announcements, role, handleDelete, onEdit, onViewDetail }) {
    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {announcements.map((announcement) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={announcement.id}>
                    <AnnouncementCard
                        announcement={announcement}
                        role={role}
                        onDelete={handleDelete}
                        onEdit={onEdit}
                        onViewDetail={onViewDetail}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default CardList;
