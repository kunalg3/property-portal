import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, MenuItem, Select, Slider, Box, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({ location: '', price: [0, 10000], propertyType: '', availableFrom: '' });
  const [locations, setLocations] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/property/');
      const data = response.data;
      setProperties(data);

      // Extract unique locations and property types
      const uniqueLocations = [...new Set(data.map(property => property.location))];
      const uniquePropertyTypes = [...new Set(data.map(property => property.propertyType))];

      setLocations(uniqueLocations);
      setPropertyTypes(uniquePropertyTypes);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const applyFilters = () => {
    let filtered = properties;

    if (filters.location) {
      filtered = filtered.filter(property => property.location === filters.location);
    }

    if (filters.propertyType) {
      filtered = filtered.filter(property => property.propertyType === filters.propertyType);
    }

    // Price filtering
    filtered = filtered.filter(property => property.price >= filters.price[0] && property.price <= filters.price[1]);

    // Date filtering based on "Available From"
    if (filters.availableFrom) {
      const selectedDate = new Date(filters.availableFrom);
      filtered = filtered.filter(property => new Date(property.availableFrom) >= selectedDate);
    }

    setFilteredProperties(filtered);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Find Your Dream Property
      </Typography>

      <Box display="flex" justifyContent="center" mb={4} gap={2}>
        <Select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">Select Location</MenuItem>
          {locations.map(location => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>

        <Slider
          name="price"
          value={filters.price}
          onChange={(e, newValue) => setFilters({ ...filters, price: newValue })}
          min={0}
          max={10000}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />

        <Select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">Select Property Type</MenuItem>
          {propertyTypes.map(type => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>

        {/* Native date input field for filtering by "Available From" */}
        <TextField
          name="availableFrom"
          label="Available From"
          type="date"
          value={filters.availableFrom}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {/* Buttons for navigation */}
      <Box display="flex" justifyContent="center" mb={4} gap={2}>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {filteredProperties.map(property => (
          <Card key={property._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={property.imageUrl || 'https://t4.ftcdn.net/jpg/04/36/23/41/360_F_436234154_GyTM8dZBFljIAL6p8tkdEfFc96J7KOKR.jpg'}
              alt={property.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
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
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
