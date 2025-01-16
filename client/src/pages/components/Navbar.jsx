import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

const Navbar = ({ leftPanelOpen, setLeftPanelOpen, navigate }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#001A6E' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }} className="quicksand-bold">
          90NORTH CHAT APP
        </Typography>
        <Button color="inherit" onClick={() => navigate("/chat")} startIcon={<MailIcon />} style={{ backgroundColor: '#009990' }}>
          Inbox
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 