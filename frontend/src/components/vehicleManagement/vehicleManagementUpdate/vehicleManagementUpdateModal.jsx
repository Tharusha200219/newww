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
  });

  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Pre-fill form with vehicle data
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
    setFormErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      await vehicleManagementService.updateVehicle(vehicle._id, formData);
      onUpdate(); // Refresh the table
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message || 'Failed to update vehicle.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full space-y-6 shadow-lg">
        <h3 className="text-2xl font-bold text-primeDark text-center">
          Update Vehicle
        </h3>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p>{error}</p>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="vehicle_id" className="block text-sm font-medium text-primeDark">
              Vehicle ID
            </label>
            <input
              id="vehicle_id"
              name="vehicle_id"
              type="number"
              value={formData.vehicle_id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300"
              placeholder="Enter Vehicle ID"
            />
          </div>
          <div>
            <label htmlFor="vehicle_type" className="block text-sm font-medium text-primeDark">
              Vehicle Type
            </label>
            <input
              id="vehicle_type"
              name="vehicle_type"
              type="text"
              value={formData.vehicle_type}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formErrors.vehicle_type ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300`}
              placeholder="e.g., Sedan, SUV"
            />
            {formErrors.vehicle_type && (
              <p className="mt-1 text-sm text-red-500">{formErrors.vehicle_type}</p>
            )}
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-primeDark">
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formErrors.brand ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300`}
              placeholder="e.g., Toyota"
            />
            {formErrors.brand && (
              <p className="mt-1 text-sm text-red-500">{formErrors.brand}</p>
            )}
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-primeDark">
              Model
            </label>
            <input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formErrors.model ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300`}
              placeholder="e.g., Camry"
            />
            {formErrors.model && (
              <p className="mt-1 text-sm text-red-500">{formErrors.model}</p>
            )}
          </div>
          <div>
            <label htmlFor="year_of_manufacture" className="block text-sm font-medium text-primeDark">
              Year of Manufacture
            </label>
            <input
              id="year_of_manufacture"
              name="year_of_manufacture"
              type="text"
              value={formData.year_of_manufacture}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300"
              placeholder="e.g., 2020"
            />
          </div>
          <div>
            <label htmlFor="seating_capacity" className="block text-sm font-medium text-primeDark">
              Seating Capacity
            </label>
            <input
              id="seating_capacity"
              name="seating_capacity"
              type="text"
              value={formData.seating_capacity}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300"
              placeholder="e.g., 5"
            />
          </div>
          <div>
            <label htmlFor="fuel_type" className="block text-sm font-medium text-primeDark">
              Fuel Type
            </label>
            <select
              id="fuel_type"
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label htmlFor="transmission_type" className="block text-sm font-medium text-primeDark">
              Transmission Type
            </label>
            <select
              id="transmission_type"
              name="transmission_type"
              value={formData.transmission_type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300"
            >
              <option value="">Select Transmission Type</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
          <div>
            <label htmlFor="image_upload" className="block text-sm font-medium text-primeDark">
              Upload Vehicle Image
            </label>
            <input
              id="image_upload"
              name="image_upload"
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300"
            />
            {formData.image_upload && (
              <p className="mt-1 text-sm text-primeGray">Current: {formData.image_upload}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-primeDark rounded-md hover:bg-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primeTeal text-white rounded-md hover:bg-primeDark transition-all duration-200"
            >
              Update Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleUpdateModal;