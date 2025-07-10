// src/Cart.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Load cart data from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Delete item from cart
  const handleDelete = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index); // Remove item from array
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to checkout page
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
              <AccountCircle fontSize="large" color='inherit' />
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
    <Box sx={{ padding: 4 ,marginTop:2 , width:1400 }}>
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
          <Typography variant="h6">Cart</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      {drawer}

      {/* Add margin-top to prevent content from hiding behind AppBar */}
      <Typography variant="h4" gutterBottom sx={{ marginTop: 8 }}>
        Your Cart
      </Typography>
      <Grid container spacing={1}>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Card
                sx={{
                  width: 250, // Fixed width
                  height: 350, // Fixed height
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  '&:hover': { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)' },
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                }}
              >
                {item.image && (
                  <CardMedia
                    component="img"
                    height="150"
                    image={item.image}
                    alt={item.name}
                    sx={{ objectFit:'cover', marginTop: '1px' }}
                  />
                )}
                <CardContent >
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" color="primary">
                  Rs {item.price}
                  </Typography>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(index)} // Delete handler
                    sx={{ marginTop: '9px' }}
                  >
                    Remove from Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">Your cart is empty.</Typography>
        )}
      </Grid>

      {/* Checkout Button */}
      {cart.length > 0 && (
        <Box sx={{ marginTop: 4 }}>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
