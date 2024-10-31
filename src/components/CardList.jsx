import React from 'react';
import { Container, List } from '@mui/material';
import AnnouncementCard from './Card';

function AnnouncementList({ announcements, role, handleDelete, onEdit }) {
  return (
    <Container>
      <List>
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} role={role} onDelete={handleDelete} onEdit={onEdit}/>
        ))}
      </List>
    </Container>
  );
}

export default AnnouncementList;
