import React, { useState, useEffect } from 'react';
import { driverService } from '../../../services/driverSrvice'; // Adjust path

const DriverUpdateModal = ({ driver, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    driver_id: driver.driver_id || '',
    full_name: driver.full_name || '',
    contact_number: driver.contact_number || '',
    email: driver.email || '',
    license_number: driver.license_number || '',
    year_of_experience: driver.year_of_experience || '',
    availability_status: driver.availability_status || '',
  });

  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setFormData({
      driver_id: driver.driver_id || '',
      full_name: driver.full_name || '',
      contact_number: driver.contact_number || '',
      email: driver.email || '',
      license_number: driver.license_number || '',
      year_of_experience: driver.year_of_experience || '',
      availability_status: driver.availability_status || '',
    });
  }, [driver]);

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
    setFormErrors({});
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await driverService.updateDriver(driver._id, formData);
      onUpdate();
      setIsVisible(false);
    } catch (err) {
      setError(err.message || 'Failed to update driver.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => onClose(), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl transform transition-all duration-300 ease-in-out ${isVisible ? 'scale-95 hover:scale-100' : 'scale-90'}`}
      >
        <div className="flex justify-between items-center sticky top-0 bg-white z-10 pb-4 border-b border-gray-200">
          <h3 className="text-3xl font-extrabold text-primeDark">Update Driver</h3>
          <button
            onClick={handleClose}
            className="text-primeGray hover:text-primeDark focus:outline-none transition-colors duration-200"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg shadow-md animate-fade-in">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                className="mt-2 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
              >
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

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
              className={`px-6 py-2 bg-primeTeal text-primeDark font-semibold rounded-lg shadow-sm hover:bg-primeTeal/80 focus:outline-none focus:ring-2 focus:ring-primeTeal transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 mr-2 text-primeDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {loading ? 'Updating...' : 'Update Driver'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverUpdateModal;