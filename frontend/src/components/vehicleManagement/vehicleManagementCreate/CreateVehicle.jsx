import React, { useState } from 'react';
import { vehicleService } from '../../../services/vehicleService';
import { useNavigate } from 'react-router-dom';

const CreateVehicle = () => {
  const navigate = useNavigate();
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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(''); // Added for image preview
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({}); // Field-specific errors

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Real-time input filtering
    if (name === 'vehicle_id' && value && (isNaN(value) || value < 0)) return;
    if (name === 'vehicle_type' && value && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === 'brand' && value && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === 'model' && value && !/^[a-zA-Z0-9-]*$/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing valid input
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set preview URL
      setErrors((prev) => ({ ...prev, image_upload: '' }));
    } else {
      setImage(null);
      setImagePreview(''); // Clear preview if invalid
      setErrors((prev) => ({ ...prev, image_upload: 'Please upload a valid image (JPEG, JPG, PNG)' }));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (image) {
        data.append('image_upload', image);
      }

      const response = await vehicleService.createVehicle(data);
      setMessage(response.message || 'Vehicle created successfully!');
      setFormData({
        vehicle_id: '',
        vehicle_type: '',
        brand: '',
        model: '',
        year_of_manufacture: '',
        seating_capacity: '',
        fuel_type: '',
        transmission_type: '',
      });
      setImage(null);
      setImagePreview(''); // Clear preview after submission
      setErrors({});
      setTimeout(() => navigate('/'), 5); // Redirect after 1.5s
    } catch (error) {
      setMessage(error.message || 'Error creating vehicle');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Add New Vehicle
        </h2>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`p-4 mb-6 rounded-md text-center ${
              message.includes('Error')
                ? 'bg-red-100 text-red-700 border-l-4 border-red-500'
                : 'bg-green-100 text-green-700 border-l-4 border-green-500'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Vehicle ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle ID
              </label>
              <input
                type="number"
                name="vehicle_id"
                value={formData.vehicle_id}
                onChange={handleChange}
                placeholder="Enter Vehicle ID"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.vehicle_id ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.vehicle_id && (
                <p className="mt-1 text-sm text-red-600">{errors.vehicle_id}</p>
              )}
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Type
              </label>
              <input
                type="text"
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
                placeholder="e.g., Sedan, SUV"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.vehicle_type ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.vehicle_type && (
                <p className="mt-1 text-sm text-red-600">{errors.vehicle_type}</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g., Toyota"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.brand ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.brand && (
                <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
              )}
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g., Camry"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.model ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.model && (
                <p className="mt-1 text-sm text-red-600">{errors.model}</p>
              )}
            </div>

            {/* Year of Manufacture */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year of Manufacture
              </label>
              <input
                type="number"
                name="year_of_manufacture"
                value={formData.year_of_manufacture}
                onChange={handleChange}
                placeholder="e.g., 2023"
                min="1900"
                max={new Date().getFullYear()}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Seating Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seating Capacity
              </label>
              <input
                type="number"
                name="seating_capacity"
                value={formData.seating_capacity}
                onChange={handleChange}
                placeholder="e.g., 5"
                min="1"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Transmission Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transmission Type
              </label>
              <select
                name="transmission_type"
                value={formData.transmission_type}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>

          {/* Image Upload with Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Image
            </label>
            <input
              type="file"
              name="image_upload"
              onChange={handleImageChange}
              accept="image/jpeg,image/jpg,image/png"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Selected Image Preview:</p>
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
            {image && !imagePreview && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {image.name}
              </p>
            )}
            {errors.image_upload && (
              <p className="mt-1 text-sm text-red-600">{errors.image_upload}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Vehicle'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVehicle;