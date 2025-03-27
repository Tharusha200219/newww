import React, { useState, useEffect } from 'react';
import { vehicleService } from '../../../services/vehicleService';

const EditVehicleModal = ({ isOpen, onClose, vehicle, onSuccess }) => {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    vehicle_type: '',
    brand: '',
    model: '',
    year_of_manufacture: '',
    seating_capacity: '',
    fuel_type: '',
    transmission_type: '',
  });
  const [image, setImage] = useState(null); // For new image upload
  const [imagePreview, setImagePreview] = useState(''); // For displaying current or new image
  const [error, setError] = useState('');

  // Populate form data and image preview when vehicle changes
  useEffect(() => {
    if (vehicle) {
      setFormData({
        vehicle_id: vehicle.vehicle_id || '',
        vehicle_type: vehicle.vehicle_type || '',
        brand: vehicle.brand || '',
        model: vehicle.model || '',
        year_of_manufacture: vehicle.year_of_manufacture || '',
        seating_capacity: vehicle.seating_capacity || '',
        fuel_type: vehicle.fuel_type || '',
        transmission_type: vehicle.transmission_type || '',
      });
      setImage(null); // Reset new image
      setImagePreview(vehicle.image_upload ? `http://localhost:5001/${vehicle.image_upload}` : ''); // Set current image
    }
  }, [vehicle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      // Generate a local preview URL for the new image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (image) {
        data.append('image_upload', image);
      }

      // Use the response from the API
      const response = await vehicleService.updateVehicle(vehicle._id, data);
      const updatedVehicle = {
        ...vehicle,
        ...formData,
        image_upload: image ? image.name : vehicle.image_upload, // Use new image name or keep existing
      };
      onSuccess(updatedVehicle); // Notify parent of success
    } catch (err) {
      setError(err.message || 'Error updating vehicle');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Edit Vehicle</h3>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="vehicle_id"
            value={formData.vehicle_id}
            onChange={handleChange}
            placeholder="Vehicle ID"
            className="w-full p-2 border"
            required
          />
          <input
            type="text"
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            placeholder="Vehicle Type"
            className="w-full p-2 border"
            required
          />
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full p-2 border"
            required
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model"
            className="w-full p-2 border"
            required
          />
          <input
            type="text"
            name="year_of_manufacture"
            value={formData.year_of_manufacture}
            onChange={handleChange}
            placeholder="Year of Manufacture"
            className="w-full p-2 border"
            required
          />
          <input
            type="text"
            name="seating_capacity"
            value={formData.seating_capacity}
            onChange={handleChange}
            placeholder="Seating Capacity"
            className="w-full p-2 border"
            required
          />
          <input
            type="text"
            name="fuel_type"
            value={formData.fuel_type}
            onChange={handleChange}
            placeholder="Fuel Type"
            className="w-full p-2 border"
            required
          />
          <input
            type="text"
            name="transmission_type"
            value={formData.transmission_type}
            onChange={handleChange}
            placeholder="Transmission Type"
            className="w-full p-2 border"
            required
          />
          {/* Display Current or New Image */}
          {imagePreview && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">Current Image:</p>
              <img
                src={imagePreview}
                alt="Vehicle Preview"
                className="h-20 w-20 object-cover rounded"
                onError={(e) => {
                  e.target.src = '../../../assets/1.png'; // Fallback image
                }}
              />
            </div>
          )}
          <input
            type="file"
            name="image_upload"
            onChange={handleImageChange}
            accept="image/jpeg,image/jpg,image/png"
            className="w-full p-2"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleModal;