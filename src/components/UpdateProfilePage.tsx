import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UpdateProfilePage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  // Load current user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setName(storedUser.name);
      setEmail(storedUser.email); // Display email but do not allow editing it
      setAddress(storedUser.address);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUser = { name, email, address };

    // Save updated user data to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Navigate back to the profile page
    navigate('/profile');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        maxWidth: 500,
        margin: 'auto',
        marginTop: '7', 
        boxShadow: 3,
        borderRadius: 8,
        position: 'absolute',
        top: '50%', /* Move to the center vertically */
  left: '50%', /* Move to the center horizontally */
  transform: ' translate(-50%, -50%)', /* Adjust position to be perfectly centered */

      }}
    >
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 3 }}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          disabled
          sx={{ marginBottom: 3 }}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ marginBottom: 3 }}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default UpdateProfilePage;
