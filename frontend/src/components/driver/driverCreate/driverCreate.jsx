import React, { useState } from 'react';
import * as driverService from '../../../services/driverSrvice';

const DriverCreateModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    driver_id: '',
    full_name: '',
    contact_number: '',
    email: '',
    license_number: '',
    year_of_experience: '',
    availability_status: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Driver ID validation: Cannot be negative
    if (!formData.driver_id) {
      newErrors.driver_id = 'Driver ID is required';
    } else if (isNaN(formData.driver_id) || Number(formData.driver_id) < 0) {
      newErrors.driver_id = 'Driver ID cannot be a negative number';
    }

    // Full name validation (only letters)
    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.full_name)) {
      newErrors.full_name = 'Full name can only contain letters';
    }

    // Contact number validation (10 digits starting with 0 followed by 1-9)
    if (!formData.contact_number) {
      newErrors.contact_number = 'Contact number is required';
    } else if (!/^0[1-9][0-9]{8}$/.test(formData.contact_number)) {
      newErrors.contact_number = 'Contact number must be 10 digits starting with 0 and followed by a non-zero digit';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // License number validation (exactly 7 or 12 alphanumeric characters)
    if (!formData.license_number) {
      newErrors.license_number = 'License number is required';
    } else if (!/^[a-zA-Z0-9]{7}$|^[a-zA-Z0-9]{12}$/.test(formData.license_number)) {
      newErrors.license_number = 'License number must be exactly 7 or 12 alphanumeric characters';
    }

    // Years of experience validation (number less than 80)
    if (!formData.year_of_experience) {
      newErrors.year_of_experience = 'Years of experience is required';
    } else {
      const years = parseInt(formData.year_of_experience);
      if (isNaN(years) || years < 0 || years >= 80) {
        newErrors.year_of_experience = 'Years of experience must be a number between 0 and 79';
      }
    }

    // Availability status validation
    if (!formData.availability_status) {
      newErrors.availability_status = 'Availability status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input-specific filtering
    if (name === 'driver_id' && value && (isNaN(value) || value < 0)) return; // Prevent negative numbers
    if (name === 'full_name' && value && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === 'contact_number' && value && !/^[0-9]*$/.test(value)) return;
    if (name === 'license_number' && value && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (name === 'year_of_experience' && value && !/^[0-9]*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await driverService.createDriver(formData);
      onCreate();
      onClose();
    } catch (err) {
      setErrors({ submit: err.message || 'Error creating driver' });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primeDark mb-4">Create New Driver</h2>
        {errors.submit && <p className="text-red-500 mb-4">{errors.submit}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Driver ID</label>
            <input
              type="number"
              name="driver_id"
              value={formData.driver_id}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.driver_id ? 'border-red-500' : ''}`}
              required
            />
            {errors.driver_id && <p className="text-red-500 text-sm">{errors.driver_id}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.full_name ? 'border-red-500' : ''}`}
              required
            />
            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Contact Number</label>
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              maxLength={10}
              className={`w-full p-2 border rounded ${errors.contact_number ? 'border-red-500' : ''}`}
              required
            />
            {errors.contact_number && <p className="text-red-500 text-sm">{errors.contact_number}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">License Number</label>
            <input
              type="text"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              maxLength={12}
              className={`w-full p-2 border rounded ${errors.license_number ? 'border-red-500' : ''}`}
              required
            />
            {errors.license_number && <p className="text-red-500 text-sm">{errors.license_number}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Years of Experience</label>
            <input
              type="text"
              name="year_of_experience"
              value={formData.year_of_experience}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.year_of_experience ? 'border-red-500' : ''}`}
              required
            />
            {errors.year_of_experience && <p className="text-red-500 text-sm">{errors.year_of_experience}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-primeDark mb-2">Availability Status</label>
            <select
              name="availability_status"
              value={formData.availability_status}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.availability_status ? 'border-red-500' : ''}`}
              required
            >
              <option value="">Select Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            {errors.availability_status && <p className="text-red-500 text-sm">{errors.availability_status}</p>}
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverCreateModal;