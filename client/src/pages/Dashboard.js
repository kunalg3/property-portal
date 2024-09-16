import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Box, Button, TextField, Grid, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    location: '',
    availableFrom: '',
    price: '',
    propertyType: '',
    imageUrl: '' // Added imageUrl field
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchUserProperties();
  }, []);

  const fetchUserProperties = async () => {
    try {
      const response = await axios.get('/property/my', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleAddProperty = async () => {
    setError(''); // Clear any previous errors
    try {
      await axios.post('/property/', newProperty, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      fetchUserProperties();
      setNewProperty({
        title: '',
        description: '',
        location: '',
        availableFrom: '',
        price: '',
        propertyType: '',
        imageUrl: '' // Reset imageUrl
      });
    } catch (error) {
      console.error('Error adding property:', error);
      setError('Failed to add property. Please try again.');
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`/property/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchUserProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setOpenDialog(true);
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setSelectedProperty({ ...selectedProperty, [name]: value });
  };

  const handleUpdateProperty = async () => {
    if (selectedProperty) {
      setError(''); // Clear any previous errors
      try {
        await axios.put(`/property/${selectedProperty._id}`, selectedProperty, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        fetchUserProperties();
        setOpenDialog(false);
      } catch (error) {
        console.error('Error updating property:', error);
        setError('Failed to update property. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Dashboard
      </Typography>

      {/* Logout Button */}
      <Box textAlign="right" mb={2}>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Add New Property
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              value={newProperty.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              value={newProperty.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="location"
              label="Location"
              value={newProperty.location}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="availableFrom"
              label="Available From"
              type="date"
              value={newProperty.availableFrom}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              type="number"
              value={newProperty.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="propertyType"
              label="Property Type"
              value={newProperty.propertyType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="imageUrl"
              label="Image URL"
              value={newProperty.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL (optional)"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddProperty}>
              Add Property
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
      </Box>

      <Typography variant="h5" gutterBottom>
        My Properties
      </Typography>
      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={property.imageUrl || 'https://t4.ftcdn.net/jpg/04/36/23/41/360_F_436234154_GyTM8dZBFljIAL6p8tkdEfFc96J7KOKR.jpg'}
                alt={property.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {property.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {property.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Available From:</strong> {new Date(property.availableFrom).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Price:</strong> Rs.{property.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Type:</strong> {property.propertyType}
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleEditClick(property)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteProperty(property._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Editing Property */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          {selectedProperty && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="title"
                  label="Title"
                  value={selectedProperty.title}
                  onChange={handleDialogChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={selectedProperty.description}
                  onChange={handleDialogChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  value={selectedProperty.location}
                  onChange={handleDialogChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="availableFrom"
                  label="Available From"
                  type="date"
                  value={selectedProperty.availableFrom}
                  onChange={handleDialogChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  value={selectedProperty.price}
                  onChange={handleDialogChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="propertyType"
                  label="Property Type"
                  value={selectedProperty.propertyType}
                  onChange={handleDialogChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="imageUrl"
                  label="Image URL"
                  value={selectedProperty.imageUrl || ''}
                  onChange={handleDialogChange}
                  placeholder="Enter image URL (optional)"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateProperty} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
