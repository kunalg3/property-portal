import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, TextField, Grid, Card, CardContent, CardMedia } from '@mui/material';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    location: '',
    availableFrom: '',
    price: '',
    propertyType: '',
  });
  const [image, setImage] = useState('');

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
    console.log(newProperty)
    try {
      const response= await axios.post('/property/', newProperty, {
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
      });
    //   setImage('');
    console.log('Property added:', response.data);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Dashboard
      </Typography>

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
          {/* <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddProperty}>
              Add Property
            </Button>
          </Grid>
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
                image={property.imageUrl || 'default-image.jpg'}
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
