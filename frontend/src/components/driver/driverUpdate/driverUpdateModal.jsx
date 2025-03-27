import React, { useState } from 'react';
import * as driverService from '../../../services/driverSrvice'; // Corrected import

const DriverUpdateModal = ({ driver, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...driver });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await driverService.updateDriver(driver._id, formData);
      onUpdate(); // Refresh the driver list
      onClose(); // Close the modal
    } catch (err) {
      setError(err.message || 'Error updating driver');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primeDark mb-4">Update Driver</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Contact Number</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">License Number</label>
            <input
              type="text"
              name="license_number"
              value={formData.license_number || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Years of Experience</label>
            <input
              type="text"
              name="year_of_experience"
              value={formData.year_of_experience || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Availability Status</label>
            <input
              type="text"
              name="availability_status"
              value={formData.availability_status || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-primeDark rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primeTeal text-primeDark rounded hover:bg-primeTeal/80"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverUpdateModal;