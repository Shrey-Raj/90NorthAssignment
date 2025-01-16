import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Typography,
} from "@mui/material";
import { toast } from 'react-toastify';
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import authService from '../../services/auth.service';

const CollapsibleLeftPanel = ({ open, onClose }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { text: "Messages", icon: <MessageIcon />, route: "/chat" },
    { text: "Logout", icon: <LogoutIcon />, route: "/logout" },
  ];

  const storedData = localStorage.getItem('user');
  const userData = JSON.parse(storedData);

  const handleLogout = () => {
    authService.logout();
    setTimeout(() => {
      toast.success("Logged out successfully!");
    }, 1000);
    navigate('/login');
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#D9EAFD",
          border: "none",
          "overflow-x":"hidden"
        },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "8px",
        }}
      >
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            className="quicksand-regular mt-10"
            style={{
              cursor: "pointer",
              backgroundColor: "#80C4E9",
              borderRadius: 5,
              margin: 5,
              padding: 10,
            }}

            onClick={item.text === "Logout" ? handleLogout : () => navigate(item.route)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <div
        style={{ backgroundColor: "#BCCCDC" }}
        className="d-flex align-items-center justify-content-start p-2 position-absolute bottom-0 w-100 rounded-top"
      >
        <Avatar src="https://bootdey.com/img/Content/avatar/avatar1.png" />
        <div style={{ marginLeft: 10 }}>
          <Typography variant="body1" color="textPrimary">
            {userData.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {userData.email}
          </Typography>
        </div>
      </div>
    </Drawer>
  );
};

export default CollapsibleLeftPanel;
