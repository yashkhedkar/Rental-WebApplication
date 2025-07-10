import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/auth/signup', {
          name,
          email,
          password,
          confirmPassword,
        });
        setSuccess(true);
        setError('');
        console.log('User created:', response.data);
      } catch (error: any) {
        setError('Failed to create user');
        console.error(error);
      }
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
        width: '200vh',
        height: '100vh',
        bgcolor: 'white',
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
        }}
      >
        {success ? (
          <>
            <Typography variant="h5" component="h1" color="primary" gutterBottom>
              Your account is created!
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Go to <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>Login</Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign Up
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
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Login here
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SignUp;
