import React, { useState } from 'react';
import { driverService } from '../../../services/driverSrvice'; // Adjust path

const DriverCreate = () => {
  const [formData, setFormData] = useState({
    driver_id: '',
    full_name: '',
    contact_number: '',
    email: '',
    license_number: '',
    year_of_experience: '',
    availability_status: '',
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

  const validateForm = () => {
    const errors = {};
    if (!formData.full_name) errors.full_name = 'Full Name is required';
    if (!formData.contact_number) errors.contact_number = 'Contact Number is required';
    if (!formData.license_number) errors.license_number = 'License Number is required';
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
      const response = await driverService.createDriver(formData);
      setSuccess('Driver created successfully!');
      setFormData({
        driver_id: '',
        full_name: '',
        contact_number: '',
        email: '',
        license_number: '',
        year_of_experience: '',
        availability_status: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to create driver.');
    }
  };

  return (
    <div className="min-h-screen bg-primeLight flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transform transition-all hover:shadow-3xl duration-500">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-primeDark tracking-tight">
            Add New Driver
          </h2>
          <p className="mt-3 text-sm text-primeGray leading-relaxed">
            Provide the details below to add a new driver to the system.
          </p>
        </div>

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

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
            <div>
              <label htmlFor="driver_id" className="block text-sm font-semibold text-primeDark">
                Driver ID
              </label>
              <input
                id="driver_id"
                name="driver_id"
                type="number"
                value={formData.driver_id}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
                placeholder="Enter Driver ID"
              />
            </div>

            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-primeDark">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 bg-gray-50 border ${formErrors.full_name ? 'border-red-500' : 'border-gray-200'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark`}
                placeholder="e.g., John Doe"
              />
              {formErrors.full_name && (
                <p className="mt-2 text-sm text-red-500 animate-fade-in">{formErrors.full_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact_number" className="block text-sm font-semibold text-primeDark">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                id="contact_number"
                name="contact_number"
                type="text"
                value={formData.contact_number}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 bg-gray-50 border ${formErrors.contact_number ? 'border-red-500' : 'border-gray-200'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark`}
                placeholder="e.g., +1234567890"
              />
              {formErrors.contact_number && (
                <p className="mt-2 text-sm text-red-500 animate-fade-in">{formErrors.contact_number}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-primeDark">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
                placeholder="e.g., john.doe@example.com"
              />
            </div>

            <div>
              <label htmlFor="license_number" className="block text-sm font-semibold text-primeDark">
                License Number <span className="text-red-500">*</span>
              </label>
              <input
                id="license_number"
                name="license_number"
                type="text"
                value={formData.license_number}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 bg-gray-50 border ${formErrors.license_number ? 'border-red-500' : 'border-gray-200'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark`}
                placeholder="e.g., DL123456"
              />
              {formErrors.license_number && (
                <p className="mt-2 text-sm text-red-500 animate-fade-in">{formErrors.license_number}</p>
              )}
            </div>

            <div>
              <label htmlFor="year_of_experience" className="block text-sm font-semibold text-primeDark">
                Years of Experience
              </label>
              <input
                id="year_of_experience"
                name="year_of_experience"
                type="text"
                value={formData.year_of_experience}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
                placeholder="e.g., 5"
              />
            </div>

            <div>
              <label htmlFor="availability_status" className="block text-sm font-semibold text-primeDark">
                Availability Status
              </label>
              <select
                id="availability_status"
                name="availability_status"
                value={formData.availability_status}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeТеal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
              >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-primeTeal to-primeDark hover:from-primeDark hover:to-primeTeal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primeTeal transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverCreate;