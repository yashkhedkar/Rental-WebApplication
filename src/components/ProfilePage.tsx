// src/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  TextField,
  ListSubheader,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string; address: string } | null>(null);
  const [orderHistory, setOrderHistory] = useState<Array<{ orderId: string; date: string; total: string }>>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Load user data from localStorage when the page is mounted
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser); // Load the updated user data including the address
    } else {
      navigate('/login'); // Redirect to login if no user data is found
    }
  }, [navigate]); // Ensures that data is fetched when the page is loaded

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from local storage
    navigate('/'); // Redirect to home or login page
  };

  // Navigate to the profile update page
  const handleUpdateProfile = () => {
    navigate('/update-profile'); // Navigate to the update profile page
  };

  // Toggle drawer open/close
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  // Drawer component
  const drawer = (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: 300,
        '& .MuiDrawer-paper': {
          width: 300,
        },
      }}
    >
      <List
        subheader={
          <ListSubheader component="div">
            <Box display="flex" alignItems="center" padding="10px">
              <AccountCircleIcon fontSize="large" color='inherit' />
              <Typography variant="subtitle1" marginLeft={1}>
                Hello
              </Typography>
            </Box>
          </ListSubheader>
        }
      >
        <ListSubheader>Trending</ListSubheader>
        <ListItem button onClick={() => navigate('/Services')}>
          <ListItemText primary="Best Services" />
        </ListItem>
        <ListItem button onClick={() => navigate('/equipment')}>
          <ListItemText primary="Best Rental Equipment" />
        </ListItem>
        <Divider />

        <ListSubheader>Shop by Category</ListSubheader>
        <ListItem button onClick={() => navigate('/equipment')}>
          <ListItemText primary="Car Renting" />
        </ListItem>
        <ListItem button onClick={() => navigate('/equipment')}>
          <ListItemText primary="Camera Renting" />
        </ListItem>
        <Divider />

        <ListSubheader>Help & Settings</ListSubheader>
        <ListItem button onClick={() => navigate('/catalog')}>
          <ListItemText primary="Catalog" />
        </ListItem>
        <ListItem button onClick={() => navigate('/cart')}>
          <ListItemText primary="Cart" />
        </ListItem>
        <ListItem button onClick={() => navigate('/vendorform')}>
          <ListItemText primary="Vendor Form" />
        </ListItem>
        <Divider />

        <ListSubheader>Help & Settings</ListSubheader>
        <ListItem button onClick={() => navigate('/profile')}>
          <ListItemText primary="Your Account" />
        </ListItem>
        <ListItem button onClick={() => navigate('/appliances')}>
          <ListItemText primary="Customer Service" />
        </ListItem>
        <ListItem button onClick={() => navigate('/')}>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar with Menu Button */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Profile</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      {drawer}

      {/* Content below AppBar */}
      <Box
        sx={{
          marginTop: 1,
          paddingX: 3,
          paddingY: 4,
          textAlign: 'left', // Align text to the left
        }}
      >
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

        {user ? (
          <Box sx={{ marginTop: 4 }}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={user.name}
              disabled
              sx={{
                marginBottom: 2,
                '& .MuiInputBase-input': { color: 'black' }, // Set text color
              }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={user.email}
              disabled
              sx={{
                marginBottom: 2,
                '& .MuiInputBase-input': { color: 'black' }, // Set text color
              }}
            />
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={user.address}
              disabled
              sx={{
                marginBottom: 2,
                '& .MuiInputBase-input': { color: 'black' }, // Set text color
              }}
            />

            {/* Order History Section */}
            <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
              Order History
            </Typography>
            <Grid container spacing={2}>
              {orderHistory.map((order) => (
                <Grid item xs={12} key={order.orderId}>
                  <Box sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 2 }}>
                    <Typography>Order ID: {order.orderId}</Typography>
                    <Typography>Date: {order.date}</Typography>
                    <Typography>Total: {order.total}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Buttons for Update Profile and Logout */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
              sx={{ marginTop: 4 }}
            >
              Update Profile
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ marginTop: 4, marginLeft: 2 }} // Adjust margin for spacing
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Typography variant="h6">Loading user information...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
