// Checkout.tsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC<{ cartItems: any[]; onCheckout: () => void }> = ({ cartItems, onCheckout }) => {
  const navigate = useNavigate();

  // Handle checkout logic
  const handleCheckout = () => {
    // Perform checkout logic, like saving the order, sending to an API, etc.
    onCheckout();
    navigate('/'); // Redirect to home or confirmation page after checkout
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* AppBar for Checkout */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Checkout</Typography>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" gutterBottom sx={{ marginTop: 8 }}>
        Review Your Order
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        {cartItems.map((item, index) => (
          <Box key={index} sx={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body1">${item.price}</Typography>
          </Box>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Complete Checkout
      </Button>
    </Box>
  );
};

export default Checkout;
