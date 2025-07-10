import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SelectLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/Catalog');
  };

  const handleVendorLogin = () => {
    navigate('/Catalog');
  };

  return (
    <Box 
      sx={{ 
        height: '100vh', 
        width:'1500px',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        paddingTop: '5%', 
        backgroundColor: '#f5f5f5', 
      }}
    >
      <Box 
        sx={{ 
          width: '90%', 
          height:'250px',
          marginTop:'90px',
          maxWidth: 600, 
          textAlign: 'center', 
          padding: '20px', 
          boxShadow: 3, 
          backgroundColor: 'white', 
          borderRadius: 2 
        }}
      >
        {/* Typography with marginBottom for spacing */}
        <Typography variant="h4" gutterBottom sx={{ marginBottom: '24px' }}>
          Select Login Option
        </Typography>

        {/* Buttons section with spacing */}
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Login as User
                </Typography>
                <Button variant="contained" color="primary" onClick={handleUserLogin} fullWidth>
                  User Login
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Login as Vendor
                </Typography>
                <Button variant="contained" color="secondary" onClick={handleVendorLogin} fullWidth>
                  Vendor Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SelectLoginPage;
