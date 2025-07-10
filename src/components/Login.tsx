import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (name: string, email: string) => {
    const userData = { name, email };

    // Storing user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    // Navigating after successful login
    navigate('/select-login');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Simple form validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long');
    } else {
      setError('');
      
      console.log('Logged in:', { name, email, password });
      
      handleLogin(name, email);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        bgcolor: 'background.default',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box
        component={motion.div}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'white',
          textAlign: 'center',
          width: { xs: '90%', sm: '400px' },
          maxWidth: '100%',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <a href="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Create one here
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
