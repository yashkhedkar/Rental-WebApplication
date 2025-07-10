import React from 'react';
import { Box, Card, CardActions, CardContent, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './catalog.css'; // Import the CSS file
import CustomAppBar from './form/Appbar'; // Import the custom AppBar
import CustomDrawer from './form/drawer'; // Import the drawer component

const Catalog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <div className="catalog-root">
      {/* Use the custom AppBar */}
      <CustomAppBar toggleDrawer={toggleDrawer} />

      {/* Use the custom drawer component */}
      <CustomDrawer open={open} toggleDrawer={toggleDrawer} />

      <Box className="catalog-content">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          dynamicHeight={true}
          className="catalog-carousel"
        >
          <div>
            <img src="src/assets/images/image1.jpeg" alt="Slide 1" />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/Services')}
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              Explore Services
            </Button>
          </div>
          <div>
            <img src="src/assets/images/image2.jpeg" alt="Slide 2" />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/equipment')}
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              Equipments
            </Button>
          </div>
        </Carousel>

        {/* Grid of Cards for Services and Equipment */}
        <Grid container spacing={4} justifyContent="center" className="catalog-grid">
          <Grid item xs={12} sm={6} md={4}>
            <Card className="catalog-card">
              <img src="src/assets/images/service.jpeg" alt="Service 1" style={{ width: '100%', height: '250px' }} />
              <CardContent>
                <Typography variant="h5" component="div">
                  Service 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore our various services tailored to meet your needs.
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <Button size="small" variant="contained" color="primary" 
                onClick={() => navigate('/Services')}>
                  Explore Services
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="catalog-card">
              <img src="src/assets/images/camera.jpeg" alt="Equipment 1" style={{ width: '100%', height: '250px' }} />
              <CardContent>
                <Typography variant="h5" component="div">
                  Equipment 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover a variety of equipment available for rent.
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <Button size="small" variant="contained" color="primary"
                onClick={() => navigate('/equipment')}>
                  View Equipment
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Catalog;
