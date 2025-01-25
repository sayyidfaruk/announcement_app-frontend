import React from 'react'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import PdfViewer from './PdfViewer';
import { Clear } from '@mui/icons-material';

export default function AnnouncementView({ selectedAnnouncement, setSelectedAnnouncement }) {
    return (
        <Dialog
            open={!!selectedAnnouncement}
            onClose={() => setSelectedAnnouncement(null)}
            fullWidth
            maxWidth="md"
            PaperProps={{
                style: { borderRadius: 15 }
            }}
        >
            {selectedAnnouncement && (
                <>
                    <DialogTitle display={'flex'} justifyContent={'space-between'} alignItems='center'>
                        <Typography variant="h6" fontWeight="bold">
                            {selectedAnnouncement.title}
                        </Typography>
                        <IconButton
                            edge="end"
                            onClick={() => setSelectedAnnouncement(null)}>
                            <Clear />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle2" color="textSecondary">
                            Dibuat oleh {selectedAnnouncement.User.name}, {new Date(selectedAnnouncement.createdAt).toLocaleDateString('id-ID')}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {selectedAnnouncement.content}
                        </Typography>
                        {selectedAnnouncement.attachment && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1" fontWeight={'bold'}>Lampiran PDF</Typography>
                                <PdfViewer file={selectedAnnouncement.attachment} />
                            </Box>
                        )}
                    </DialogContent>
                </>
            )}
        </Dialog>
    )
}
