import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, MenuItem, Select, Slider, Box, Card, CardContent, CardMedia } from '@mui/material';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({ location: '', price: [0, 10000], propertyType: '' });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/property/');
      setProperties(response.data);
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

    filtered = filtered.filter(property => property.price >= filters.price[0] && property.price <= filters.price[1]);

    setFilteredProperties(filtered);
  };

  const fetchLocations = [
    { value: '', label: "Select Location" },
    { value: "New York", label: "New York" },
    { value: "Los Angeles", label: "Los Angeles" },
    // Add more locations here...
  ];

  const fetchPropertytype = [
    { value: '', label: "Select Property Type" },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'House', label: 'House' }
  ];

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
          {fetchLocations.map((location) => (
            <MenuItem key={location.value} value={location.value}>
              {location.label}
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
          {fetchPropertytype.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {filteredProperties.map(property => (
          <Card key={property._id} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={property.imageUrl || 'default-image.jpg'}
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
