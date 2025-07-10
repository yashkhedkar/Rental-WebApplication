import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  ListSubheader,
  Divider,
  Rating,
  Chip,
} from '@mui/material';
import { ShoppingCart, AccountCircle, ExitToApp } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AppBar from './form/appbarEuip'; // Import the AppBar

const Equipment: React.FC = () => {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEquipments = JSON.parse(localStorage.getItem('equipments') || '[]');
    setEquipments(storedEquipments);

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleAddToCart = (equipment: any) => {
    const updatedCart = [...cart, equipment];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSnackbarOpen(true); // Show snackbar notification
  };

  const handleDelete = (index: number) => {
    const updatedEquipments = [...equipments];
    updatedEquipments.splice(index, 1);
    setEquipments(updatedEquipments);
    localStorage.setItem('equipments', JSON.stringify(updatedEquipments));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ padding: 4 ,marginTop:2 , width:1400}}>
      <AppBar onMenuClick={() => toggleDrawer(true)} searchQuery={''} onSearchChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
        throw new Error('Function not implemented.');
      } } /> {/* Use the imported AppBar */}

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

      <Typography variant="h4" gutterBottom sx={{ marginTop: 8 }}>
        Available Equipment
      </Typography>
      <Grid container spacing={1}>
        {equipments.map((equipment, index) => (
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
                cursor: 'pointer',
              }}
            >
              {equipment.tag && (
                <Chip
                  label={equipment.tag}
                  color="primary"
                  sx={{ position: 'absolute', top: 8, left: 8 }}
                />
              )}
             {equipment.image && (
                <CardMedia
                  component="img"
                  height="150"
                  image={equipment.image}
                  alt={equipment.name}
                  sx={{ objectFit:'cover', marginTop: '1px' }}
                />
              )}
              <CardContent sx={{ padding: '6px' }}>
                <Typography variant="subtitle1" noWrap>
                  {equipment.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ margin: '1px' }}>
                  {equipment.description || 'No description available.'}
                </Typography>

                {equipment.oldPrice && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    Rs {equipment.oldPrice}
                  </Typography>
                )}

                <Typography variant="subtitle2" color="primary" sx={{ marginBottom: '1px' }}>
                  Rs {equipment.price}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                <Rating value={equipment.rating || 0} readOnly />
                </Box>

                {equipment.sellerRating && (
                  <Typography variant="caption" color="textSecondary">
                    Seller rating: {equipment.sellerRating}
                  </Typography>
                )}
                  
                <Button variant="text" color="secondary" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
                  <Button
                  variant="text"
                  color="secondary"
                  onClick={() => handleAddToCart(equipment)}
                  sx={{ marginBottom: '2px' }}
                >
                  Add to Cart
                </Button>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '50%' }}>
          Equipment added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Equipment;
