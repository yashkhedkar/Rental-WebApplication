import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box, ListSubheader, Divider, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

interface DrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

const CustomDrawer: React.FC<DrawerProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
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
};

export default CustomDrawer;
