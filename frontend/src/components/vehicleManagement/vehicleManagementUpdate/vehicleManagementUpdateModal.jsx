import React, { useState, useEffect } from 'react';
import vehicleManagementService from '../../../services/vehicleManagement';

const VehicleUpdateModal = ({ vehicle, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    vehicle_id: vehicle.vehicle_id || '',
    vehicle_type: vehicle.vehicle_type || '',
    brand: vehicle.brand || '',
    model: vehicle.model || '',
    year_of_manufacture: vehicle.year_of_manufacture || '',
    seating_capacity: vehicle.seating_capacity || '',
    fuel_type: vehicle.fuel_type || '',
    transmission_type: vehicle.transmission_type || '',
    image_upload: vehicle.image_upload || '',
    imagePreview: null,
  });

  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setFormData({
      vehicle_id: vehicle.vehicle_id || '',
      vehicle_type: vehicle.vehicle_type || '',
      brand: vehicle.brand || '',
      model: vehicle.model || '',
      year_of_manufacture: vehicle.year_of_manufacture || '',
      seating_capacity: vehicle.seating_capacity || '',
      fuel_type: vehicle.fuel_type || '',
      transmission_type: vehicle.transmission_type || '',
      image_upload: vehicle.image_upload || '',
      imagePreview: vehicle.image_upload && vehicle.image_upload !== 'N/A' ? vehicle.image_upload : null,
    });
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image_upload: file.name,
        imagePreview: previewUrl,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.vehicle_type) errors.vehicle_type = 'Vehicle Type is required';
    if (!formData.brand) errors.brand = 'Brand is required';
    if (!formData.model) errors.model = 'Model is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFormErrors({});
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await vehicleManagementService.updateVehicle(vehicle._id, formData);
      onUpdate();
      setIsVisible(false);
    } catch (err) {
      setError(err.message || 'Failed to update vehicle.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => onClose(), 300); // Match the duration of the animation
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl transform transition-all duration-300 ease-in-out ${
          isVisible ? 'scale-95 hover:scale-100' : 'scale-90'
        } scrollbar-thin scrollbar-thumb-primeTeal scrollbar-track-gray-100`}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center sticky top-0 bg-white z-10 pb-4 border-b border-gray-200">
          <h3 className="text-3xl font-extrabold text-primeDark">
            Update Vehicle
          </h3>
          <button
            onClick={handleClose}
            className="text-primeGray hover:text-primeDark focus:outline-none transition-colors duration-200"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg shadow-md animate-fade-in">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Vehicle ID */}
            <div>
              <label htmlFor="vehicle_id" className="block text-sm font-semibold text-primeDark">
                Vehicle ID
              </label>
              <input
                id="vehicle_id"
                name="vehicle_id"
                type="number"
                value={formData.vehicle_id}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
                placeholder="Enter Vehicle ID"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label htmlFor="vehicle_type" className="block text-sm font-semibold text-primeDark">
                Vehicle Type <span className="text-red-500">*</span>
              </label>
              <input
                id="vehicle_type"
                name="vehicle_type"
                type="text"
                value={formData.vehicle_type}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 bg-gray-50 border ${
                  formErrors.vehicle_type ? 'border-red-500' : 'border-gray-200'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark`}
                placeholder="e.g., Sedan, SUV"
              />
              {formErrors.vehicle_type && (
                <p className="mt-2 text-sm text-red-500 animate-fade-in">{formErrors.vehicle_type}</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label htmlFor="brand" className="block text-sm font-semibold text-primeDark">
                Brand <span className="text-red-500">*</span>
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 bg-gray-50 border ${
                  formErrors.brand ? 'border-red-500' : 'border-gray-200'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark`}
                placeholder="e.g., Toyota"
              />
              {formErrors.brand && (
                <p className="mt-2 text-sm text-red-500 animate-fade-in">{formErrors.brand}</p>
              )}
            </div>

            {/* Model */}
            <div>
              <label htmlFor="model" className="block text-sm font-semibold text-primeDark">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                id="model"
                name="model"
                type="text"
                value={formData.model}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 bg-gray-50 border ${
                  formErrors.model ? 'border-red-500' : 'border-gray-200'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark`}
                placeholder="e.g., Camry"
              />
              {formErrors.model && (
                <p className="mt-2 text-sm text-red-500 animate-fade-in">{formErrors.model}</p>
              )}
            </div>

            {/* Year of Manufacture */}
            <div>
              <label htmlFor="year_of_manufacture" className="block text-sm font-semibold text-primeDark">
                Year of Manufacture
              </label>
              <input
                id="year_of_manufacture"
                name="year_of_manufacture"
                type="text"
                value={formData.year_of_manufacture}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
                placeholder="e.g., 2020"
              />
            </div>

            {/* Seating Capacity */}
            <div>
              <label htmlFor="seating_capacity" className="block text-sm font-semibold text-primeDark">
                Seating Capacity
              </label>
              <input
                id="seating_capacity"
                name="seating_capacity"
                type="text"
                value={formData.seating_capacity}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
                placeholder="e.g., 5"
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label htmlFor="fuel_type" className="block text-sm font-semibold text-primeDark">
                Fuel Type
              </label>
              <select
                id="fuel_type"
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
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
              <label htmlFor="transmission_type" className="block text-sm font-semibold text-primeDark">
                Transmission Type
              </label>
              <select
                id="transmission_type"
                name="transmission_type"
                value={formData.transmission_type}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
              >
                <option value="">Select Transmission Type</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="sm:col-span-2">
              <label htmlFor="image_upload" className="block text-sm font-semibold text-primeDark">
                Upload Vehicle Image
              </label>
              <div className="mt-2 relative">
                <input
                  id="image_upload"
                  name="image_upload"
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primeTeal file:text-primeDark hover:file:bg-primeDark hover:file:text-primeLight"
                />
                {formData.imagePreview && (
                  <div className="mt-4">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
                {formData.image_upload && !formData.imagePreview && (
                  <p className="mt-2 text-sm text-primeGray">
                    Current: <span className="font-medium">{formData.image_upload}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 sticky bottom-0 bg-white pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 bg-gray-200 text-primeDark font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-primeTeal text-primeDark font-semibold rounded-lg shadow-sm hover:bg-primeTeal/80 focus:outline-none focus:ring-2 focus:ring-primeTeal transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-primeDark"
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
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {loading ? 'Updating...' : 'Update Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleUpdateModal;