import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Paper, Alert } from '@mui/material';
import { toast } from 'react-hot-toast'; // Importing react-hot-toast

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful! Redirecting to dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password');
      toast.error('Login failed! Invalid email or password.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleLogin}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </Box>
            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don't have an account?
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSignupRedirect}
              fullWidth
            >
              Signup
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
