import React, { useState } from 'react';
import { vehicleManagementService } from '../../../services/vehicleManagement';

const VehicleForm = () => {
  const [formData, setFormData] = useState({
    vehicle_id: '',
    vehicle_type: '',
    brand: '',
    model: '',
    year_of_manufacture: '',
    seating_capacity: '',
    fuel_type: '',
    transmission_type: '',
    image_upload: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({});

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
      setFormData((prevData) => ({
        ...prevData,
        image_upload: file.name,
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
    setSuccess(null);
    setFormErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const response = await vehicleManagementService.createVehicle(formData);
      setSuccess('Vehicle created successfully!');
      setFormData({
        vehicle_id: '',
        vehicle_type: '',
        brand: '',
        model: '',
        year_of_manufacture: '',
        seating_capacity: '',
        fuel_type: '',
        transmission_type: '',
        image_upload: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to create vehicle.');
    }
  };

  return (
    <div className="min-h-screen bg-primeLight flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transform transition-all hover:shadow-3xl duration-500">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-primeDark tracking-tight">
            Add New Vehicle
          </h2>
          <p className="mt-3 text-sm text-primeGray leading-relaxed">
            Provide the details below to add a new vehicle to the PrimeRide system.
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-lg shadow-md animate-fade-in">
            <p className="font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg shadow-md animate-fade-in">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
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
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primeTeal file:text-white hover:file:bg-primeDark"
                />
                {formData.image_upload && (
                  <p className="mt-2 text-sm text-primeGray">
                    Selected: <span className="font-medium">{formData.image_upload}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-primeTeal to-primeDark hover:from-primeDark hover:to-primeTeal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primeTeal transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;