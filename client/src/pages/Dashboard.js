import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/Property/PropertyCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [myProperties, setMyProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/property/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyProperties(response.data);
    } catch (error) {
      console.error('Error fetching your properties:', error);
    }
  };

  const handleAddProperty = () => {
    navigate('/add-property');
  };

  return (
    <div>
      <h1>My Properties</h1>
      <button onClick={handleAddProperty}>Add New Property</button>
      <div className="property-list">
        {myProperties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
