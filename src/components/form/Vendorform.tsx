import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Fade,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './VendorForm.css';

const VendorForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('service');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [available, setAvailable] = useState('yes');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentServiceCount, setCurrentServiceCount] = useState(0);

  // Fetch the current number of services on mount
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setCurrentServiceCount(storedServices.length);
  }, []);

  // Handle image upload and preview
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Retrieve the current services array
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');

    // Check if we already have 50 services
    if (selectedType === 'service' && storedServices.length >= 50) {
      setErrorMessage('You cannot add more than 50 services.');
      return;
    }

    // Prepare new service
    const newItem = {
      name,
      description,
      price,
      image: imagePreview,
      available,
      ownerId,
    };

    // Add new service and update local storage
    if (selectedType === 'service') {
      storedServices.push(newItem);
      localStorage.setItem('services', JSON.stringify(storedServices));
      setCurrentServiceCount(storedServices.length); // Update service count
      navigate('/services'); // Redirect to services page
    } else {
      const storedEquipments = JSON.parse(localStorage.getItem('equipments') || '[]');
      storedEquipments.push(newItem);
      localStorage.setItem('equipments', JSON.stringify(storedEquipments));
      navigate('/equipment'); // Redirect to equipment page
    }
  };

  return (
    <Box className="vendor-form">
      <Fade in={true} timeout={1000}>
        <Typography variant="h4" component="h1" className="form-title">
          Add Equipment or Service
        </Typography>
      </Fade>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>} {/* Display error message */}

      <form onSubmit={handleSubmit} className="form-content">
        <RadioGroup value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <FormControlLabel value="equipment" control={<Radio />} label="Equipment" />
          <FormControlLabel value="service" control={<Radio />} label="Service" />
        </RadioGroup>

        <TextField
          label="Owner ID"
          variant="outlined"
          fullWidth
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          required
        />

        

        <TextField
          label={selectedType === 'equipment' ? 'Equipment Name' : 'Service Name'}
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <TextField
          label="Price (Rs)"
          variant="outlined"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <Typography variant="subtitle1" className="availability-label">
          Available:
        </Typography>
        <RadioGroup
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
          row
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        <Button variant="contained" component="label" className="upload-button">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>

        {imagePreview && (
          <Box className="image-preview">
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img src={imagePreview} alt="Preview" className="preview-image" />
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary" className="submit-button" disabled={currentServiceCount >= 50}>
          Submit
        </Button>
      </form>

      {/* <Typography variant="body1" color="textSecondary">
        {`You have added ${currentServiceCount} services. Maximum allowed is 50.`}
      </Typography> */}
    </Box>
  );
};

export default VendorForm;
