import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AuthGuard from '../services/AuthGuard';
import CollapsibleLeftPanel from './components/LeftPanel';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from './components/Navbar';

function Dashboard() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [interest, setInterest] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const storedData = localStorage.getItem('user');
  const userData = JSON.parse(storedData);

  console.log("userData = " , userData); 

  const accessToken = userData.access;
  const userEmail = userData.email;

  useEffect(() => {
    fetchUsers();
    fetchInterest();
  }, [accessToken]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchInterest = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/recieved-interest/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setInterest(response.data);
    } catch (error) {
      console.error('Error fetching interest:', error);
    }
  };

  const sendRequest = async (userId) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/send-interest/', 
        { receiver: userId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
        }
      );
      fetchUsers(); // Refresh the user list
      setSentRequests((prevState) => [...prevState, userId]); // Add to sent requests
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleInterest = async (action, id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/${action}-interest/`, 
        { user_id: id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
        }
      );
      fetchInterest(); // Refresh the interest list
    } catch (error) {
      console.error(`Error ${action} interest:`, error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor:"#F8FAFC" }}>
      <Navbar leftPanelOpen={leftPanelOpen} setLeftPanelOpen={setLeftPanelOpen} navigate={navigate} />
      <CollapsibleLeftPanel open={leftPanelOpen} onClose={() => setLeftPanelOpen(false)} />
      <Container 
        sx={{ 
          mt: 8, 
          mb: 4, 
          flexGrow: 1, 
          display: 'flex',
          ml: isSmallScreen ? 0 : leftPanelOpen ? '240px' : 0,
          width: isSmallScreen ? '100%' : leftPanelOpen ? 'calc(100% - 240px)' : '100%',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={12} md={8}>
            <Paper style={{ padding: 16, marginBottom: 16 }}>
              <Typography variant="h6" className="quicksand-medium">Your Interest Requests</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {interest.map((item) => {
                      const isSender = item.sender.email === userEmail;
                      const user = isSender ? item.receiver : item.sender;
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                              <div style={{ marginLeft: 10 }}>
                                <Typography>{user.username}</Typography>
                                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {item.status === 'pending' && isSender && (
                              <Button variant="outlined" color="secondary" disabled>Pending</Button>
                            )}
                            {item.status === 'pending' && !isSender && (
                              <>
                                <Button variant="contained" color="primary" onClick={() => handleInterest('accept', user.id)} style={{ marginRight: 8 }}>Accept</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleInterest('reject', user.id)}>Reject</Button>
                              </>
                            )}
                            {item.status === 'accepted' && (
                              <Button variant="outlined" color="primary" disabled>Accepted</Button>
                            )}
                            {item.status === 'rejected' && (
                              <Button variant="outlined" color="secondary" disabled>Rejected</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: 16 }}>
              <Typography variant="h6" className="quicksand-medium">All Users</Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    {users
                      .filter(user => user.email !== userEmail)
                      .map(user => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                              <Avatar src={`https://i.pravatar.cc/40?u=${user.email}`} />
                              <div style={{ marginLeft: 10 }}>
                                <Typography>{user.username}</Typography>
                                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              onClick={() => sendRequest(user.id)}
                              disabled={sentRequests.includes(user.id)}
                              style={{ 
                                transition: 'all 0.3s ease', 
                                fontFamily: 'Sora, sans-serif',
                                fontWeight: '500',
                                backgroundColor: sentRequests.includes(user.id) ? 'gray' : '#009990',
                                fontSize: '0.7em',
                              }}
                              className="quicksand-regular"
                            >
                              {sentRequests.includes(user.id) ? "Request Sent" : "Send Request"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Paper component="footer" square style={{ padding: 16, marginTop: 'auto' }}>
        <Typography variant="body2" color="textSecondary" align="center" className="sora-light">
          © 2025 90North. All rights reserved.
        </Typography>
      </Paper>
    </div>
  );
}

export default AuthGuard(Dashboard);
