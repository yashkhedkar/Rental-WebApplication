import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Rating, Chip } from '@mui/material';

const ServiceDetails: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>(); // Get serviceId from URL
  const [service, setService] = useState<any | null>(null);

  useEffect(() => {
    // Fetch the service details from local storage based on the serviceId
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const selectedService = services.find((s: any) => s.id === serviceId);
    setService(selectedService);
  }, [serviceId]);

  if (!service) {
    return <Typography variant="h6">Service not found</Typography>;
  }

  return (
    <Box sx={{ padding: 2, marginTop: 10 }}>
      <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
        {service.tag && (
          <Chip label={service.tag} color="primary" sx={{ position: 'absolute', top: 8, left: 8 }} />
        )}
        {service.image && <CardMedia component="img" height="300" image={service.image} alt={service.name} />}
        <CardContent>
          <Typography variant="h5">{service.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {service.description || 'No description available.'}
          </Typography>
          <Typography variant="h6" color="primary">
            Rs {service.price}
          </Typography>
          {service.oldPrice && (
            <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
              Rs {service.oldPrice}
            </Typography>
          )}
          <Rating value={service.rating || 0} readOnly />
          {service.sellerRating && (
            <Typography variant="caption" color="textSecondary">
              Seller rating: {service.sellerRating}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ServiceDetails;
