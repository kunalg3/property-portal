import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.location}</p>
      <p>Price: ${property.price}</p>
      <p>Type: {property.propertyType}</p>
    </div>
  );
};

export default PropertyCard;
