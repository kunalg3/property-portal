import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Paper, Alert } from '@mui/material';
import { toast } from 'react-hot-toast'; // Importing react-hot-toast

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors
    try {
        const {data}=  await axios.post('/auth/signup', { email, password });
        if(data.error){
            toast.error(data.error)
        }
        else{
            toast.success("Account registered successfully")
            navigate('/login')
        }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up. Please try again.');
      toast.error('Signup failed! Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
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
            Signup
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSignup}>
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
                autoComplete="new-password"
              />
            </Box>
            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Signup
              </Button>
            </Box>
          </form>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleLoginRedirect}
              fullWidth
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
