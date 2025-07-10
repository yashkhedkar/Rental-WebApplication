import React from 'react';
import UpdateForm from './UpdateForm';

const ParentComponent: React.FC = () => {
  const existingData = {
    name: 'Old Service Name',
    description: 'Old description here.',
    price: '100',
    ownerId: '12345',
    image: null, // or existing image URL
    available: 'yes',
  };

  const handleUpdate = (updatedData: any) => {
    // Handle the update logic here (e.g., API call, localStorage update)
    console.log('Updated data:', updatedData);
    // Navigate or show a success message as needed
  };

  return (
    <div>
      <h1>Update Equipment/Service</h1>
      <UpdateForm existingData={existingData} onUpdate={handleUpdate} />
    </div>
  );
};

export default ParentComponent;
