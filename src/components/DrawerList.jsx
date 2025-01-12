import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

function DrawerList({ drawerOpen, toggleDrawer, menuItems }) {
    return (
        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <img
                    src="/div_tik_polri-logo.png"
                    alt="Logo Divisi TIK Polri"
                    style={{ maxWidth: '50%', height: 'auto', display: 'block', margin: 'auto', padding: 30 }}
                />
                <Divider variant="middle" sx={{ mt: 1 }} />
                <List>
                    {menuItems.map((item) => (
                        <React.Fragment key={item.text}>
                            <ListItem disablePadding>
                                <ListItemButton component="a" href={item.path}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="middle" sx={{ m: 1 }} />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}

export default DrawerList