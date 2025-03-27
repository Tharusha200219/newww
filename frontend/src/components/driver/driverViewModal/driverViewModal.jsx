import React from 'react';

const DriverViewModal = ({ driver, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full space-y-6 shadow-2xl transform transition-all duration-500 scale-95 hover:scale-100">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-extrabold text-primeDark">Driver Details</h3>
          <button
            onClick={onClose}
            className="text-primeGray hover:text-primeDark focus:outline-none transition-colors duration-200"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primeGray">Driver ID</label>
              <p className="mt-1 text-base text-primeDark font-medium">{driver.driver_id || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">Full Name</label>
              <p className="mt-1 text-base text-primeDark font-medium">{driver.full_name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">Contact Number</label>
              <p className="mt-1 text-base text-primeDark font-medium">{driver.contact_number || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">Email</label>
              <p className="mt-1 text-base text-primeDark font-medium">{driver.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">License Number</label>
              <p className="mt-1 text-base text-primeDark font-medium">{driver.license_number || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">Years of Experience</label>
              <p className="mt-1 text-base text-primeDark font-medium">{driver.year_of_experience || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">Availability Status</label>
              <p className="mt-1 text-base text-primeDark font-medium">{driver.availability_status || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primeTeal text-primeDark font-semibold rounded-lg shadow-sm hover:bg-primeTeal/80 focus:outline-none focus:ring-2 focus:ring-primeTeal transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverViewModal;
