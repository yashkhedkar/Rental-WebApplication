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
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './VendorForm.css';

interface UpdateFormProps {
  onUpdate: (updatedData: {
    id: string;
    name: string;
    description: string;
    price: string;
    ownerId: string;
    image: string | null;
    available: string;
  }) => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ onUpdate }) => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('service');
  const [selectedId, setSelectedId] = useState<string>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [available, setAvailable] = useState('yes');
  const [errorMessage, setErrorMessage] = useState('');
  const [availableIds, setAvailableIds] = useState<string[]>([]);

  // Fetch available IDs on mount
  useEffect(() => {
    const fetchAvailableIds = () => {
      const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
      const storedEquipments = JSON.parse(localStorage.getItem('equipments') || '[]');
      const serviceIds = storedServices.map((service: any) => service.id);
      const equipmentIds = storedEquipments.map((equipment: any) => equipment.id);
      setAvailableIds(selectedType === 'service' ? serviceIds : equipmentIds);
    };

    fetchAvailableIds();
  }, [selectedType]);

  // Handle ID selection change
  const handleIdChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedId = event.target.value as string;
    setSelectedId(selectedId);

    // Fetch existing data based on selected ID
    const storedData = selectedType === 'service'
      ? JSON.parse(localStorage.getItem('services') || '[]')
      : JSON.parse(localStorage.getItem('equipments') || '[]');

    const item = storedData.find((data: any) => data.id === selectedId);
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price);
      setOwnerId(item.ownerId);
      setAvailable(item.available);
      setImagePreview(item.image);
    }
  };

  // Handle image upload and preview
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Prepare updated data
    const updatedData = {
      id: selectedId,
      name,
      description,
      price,
      image: imagePreview,
      available,
      ownerId,
    };

    // Call the onUpdate function passed as prop
    onUpdate(updatedData);
    navigate(selectedType === 'service' ? '/services' : '/equipment'); // Redirect
  };

  return (
    <Box className="vendor-form">
      <Fade in={true} timeout={1000}>
        <Typography variant="h4" component="h1" className="form-title">
          Update Equipment or Service
        </Typography>
      </Fade>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>} {/* Display error message */}

      <form onSubmit={handleSubmit} className="form-content">
        <RadioGroup value={selectedType} onChange={(e) => {
          setSelectedType(e.target.value);
          setSelectedId(''); // Reset selected ID on type change
          setName('');
          setDescription('');
          setPrice('');
          setOwnerId('');
          setAvailable('yes');
          setImagePreview(null);
        }}>
          <FormControlLabel value="equipment" control={<Radio />} label="Equipment" />
          <FormControlLabel value="service" control={<Radio />} label="Service" />
        </RadioGroup>

        <Select
          value={selectedId}
          onChange={handleIdChange}
          displayEmpty
          fullWidth
          required
        >
          <MenuItem value="" disabled>Select {selectedType === 'service' ? 'Service' : 'Equipment'} ID</MenuItem>
          {availableIds.map((id) => (
            <MenuItem key={id} value={id}>{id}</MenuItem>
          ))}
        </Select>

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

        <Button type="submit" variant="contained" color="primary" className="submit-button">
          Update
        </Button>
      </form>
    </Box>
  );
};

export default UpdateForm;
