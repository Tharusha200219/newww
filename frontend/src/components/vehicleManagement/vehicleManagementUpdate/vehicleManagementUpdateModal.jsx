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
  const [error, setError] = useState(''); // General error message
  const [fieldErrors, setFieldErrors] = useState({}); // Field-specific errors

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
    const { name, value } = e.target;

    // Real-time input filtering
    if (name === 'vehicle_id' && value && (isNaN(value) || value < 0)) return;
    if (name === 'vehicle_type' && value && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === 'brand' && value && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === 'model' && value && !/^[a-zA-Z0-9-]*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing valid input
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setFieldErrors((prev) => ({ ...prev, image_upload: '' })); // Clear image error
    } else {
      setImage(null);
      setImagePreview(vehicle.image_upload ? `http://localhost:5001/${vehicle.image_upload}` : ''); // Revert to original image
      setFieldErrors((prev) => ({
        ...prev,
        image_upload: 'Please upload a valid image (JPEG, JPG, PNG)',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Vehicle ID: Cannot be negative
    if (!formData.vehicle_id) {
      newErrors.vehicle_id = 'Vehicle ID is required';
    } else if (isNaN(formData.vehicle_id) || Number(formData.vehicle_id) < 0) {
      newErrors.vehicle_id = 'Vehicle ID cannot be a negative number';
    }

    // Vehicle Type: Letters and spaces only
    if (!formData.vehicle_type) {
      newErrors.vehicle_type = 'Vehicle type is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.vehicle_type)) {
      newErrors.vehicle_type = 'Vehicle type can only contain letters and spaces';
    }

    // Brand: Letters and spaces only
    if (!formData.brand) {
      newErrors.brand = 'Brand is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.brand)) {
      newErrors.brand = 'Brand can only contain letters and spaces';
    }

    // Model: Letters, numbers, and hyphens only
    if (!formData.model) {
      newErrors.model = 'Model is required';
    } else if (!/^[a-zA-Z0-9-]+$/.test(formData.model)) {
      newErrors.model = 'Model can only contain letters, numbers, and hyphens';
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fix the errors in the form');
      return;
    }

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (image) {
        data.append('image_upload', image);
      }

      const response = await vehicleService.updateVehicle(vehicle._id, data);
      const updatedVehicle = {
        ...vehicle,
        ...formData,
        image_upload: image ? image.name : vehicle.image_upload, // Use new image name or keep existing
      };
      onSuccess(updatedVehicle); // Notify parent of success
      onClose(); // Close modal on success
    } catch (err) {
      setError(err.message || 'Error updating vehicle');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Edit Vehicle</h3>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
            <input
              type="number"
              name="vehicle_id"
              value={formData.vehicle_id}
              onChange={handleChange}
              placeholder="Vehicle ID"
              className={`mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                fieldErrors.vehicle_id ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.vehicle_id && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.vehicle_id}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
            <input
              type="text"
              name="vehicle_type"
              value={formData.vehicle_type}
              onChange={handleChange}
              placeholder="e.g., Sedan, SUV"
              className={`mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                fieldErrors.vehicle_type ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.vehicle_type && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.vehicle_type}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Toyota"
              className={`mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                fieldErrors.brand ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.brand && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.brand}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g., Camry"
              className={`mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                fieldErrors.model ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.model && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.model}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year of Manufacture</label>
            <input
              type="number"
              name="year_of_manufacture"
              value={formData.year_of_manufacture}
              onChange={handleChange}
              placeholder="e.g., 2023"
              min="1900"
              max={new Date().getFullYear()}
              className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Seating Capacity</label>
            <input
              type="number"
              name="seating_capacity"
              value={formData.seating_capacity}
              onChange={handleChange}
              placeholder="e.g., 5"
              min="1"
              className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
            <select
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Transmission Type</label>
            <select
              name="transmission_type"
              value={formData.transmission_type}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Image</label>
            <input
              type="file"
              name="image_upload"
              onChange={handleImageChange}
              accept="image/jpeg,image/jpg,image/png"
              className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {fieldErrors.image_upload && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.image_upload}</p>
            )}
          </div>
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