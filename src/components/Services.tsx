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
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import AppBar from './form/appbarEuip'; 

const Services: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setServices(storedServices);

    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleDelete = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1); 
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices)); 
  };

  const handleAddToCart = (service: any) => {
    const updatedCart = [...cart, service]; 
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setSnackbarOpen(true); 
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleCardClick = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <Box sx={{ padding: 4 ,marginTop:2 , width:1400 }}>
      {/* Custom AppBar with search functionality */}
      <AppBar onMenuClick={() => toggleDrawer(true)} searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      <Typography variant="h5" gutterBottom sx={{ marginTop: 1 }}>
        Available Services
      </Typography>

      {/* Drawer */}
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
                <AccountCircle fontSize="large" color="inherit" />
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

      <Grid container spacing={1}>
        {filteredServices.map((service, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card
              sx={{
                width: 250, 
                height: 350, 
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                '&:hover': { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)' },
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                cursor: 'pointer', 
              }}
              onClick={() => handleCardClick(service.id)} 
            >
              {service.tag && (
                <Chip
                  label={service.tag}
                  color="primary"
                  sx={{ position: 'absolute', top: 8, left: 8 }}
                />
              )}
              {service.image && (
                <CardMedia
                  component="img"
                  height="150"
                  image={service.image}
                  alt={service.name}
                  sx={{ objectFit: 'cover', marginTop: '1px' }}
                />
              )}
              <CardContent sx={{ padding: '6px' }}>
                <Typography variant="subtitle1" noWrap>
                  {service.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ margin: '1px' }}>
                  {service.description || 'No description available.'}
                </Typography>

                {service.oldPrice && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    Rs {service.oldPrice}
                  </Typography>
                )}

                <Typography variant="subtitle2" color="primary" sx={{ marginBottom: '1px' }}>
                  Rs {service.price}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                  <Rating value={service.rating || 0} readOnly />
                </Box>

                {service.sellerRating && (
                  <Typography variant="caption" color="textSecondary">
                    Seller rating: {service.sellerRating}
                  </Typography>
                )}

                <Button
                  variant="text"
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleAddToCart(service);
                  }}
                  sx={{ marginBottom: '2px' }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="text"
                  color="secondary"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDelete(index);
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '50%' }}>
          Service added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Services;
