import React from 'react';

const VehicleViewModal = ({ vehicle, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full space-y-6 shadow-2xl transform transition-all duration-500 scale-95 hover:scale-100">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-extrabold text-primeDark">
            Vehicle Details
          </h3>
          <button
            onClick={onClose}
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

        {/* Vehicle Details Section */}
        <div className="space-y-6">
          {/* Image Preview (if available) */}
          {vehicle.image_upload && vehicle.image_upload !== 'N/A' ? (
            <div className="relative">
              <img
                src={vehicle.image_upload}
                alt="Vehicle"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
              <p className="text-primeGray text-sm font-medium">No Image Available</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-primeGray">
                Vehicle ID
              </label>
              <p className="mt-1 text-base text-primeDark font-medium">
                {vehicle.vehicle_id || 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">
                Vehicle Type
              </label>
              <p className="mt-1 text-base text-primeDark font-medium">
                {vehicle.vehicle_type || 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">
                Brand
              </label>
              <p className="mt-1 text-base text-primeDark font-medium">
                {vehicle.brand || 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">
                Model
              </label>
              <p className="mt-1 text-base text-primeDark font-medium">
                {vehicle.model || 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">
                Year of Manufacture
              </label>
              <p className="mt-1 text-base text-primeDark font-medium">
                {vehicle.year_of_manufacture || 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">
                Seating Capacity
              </label>
              <p className="mt-1 text-base text-primeDark font-medium">
                {vehicle.seating_capacity || 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">
                Fuel Type
              </label>
              <p className="mt-1 text-base text-primeDark font-medium">
                {vehicle.fuel_type || 'N/A'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primeGray">
                Transmission Type
              </label>
              <p className="mt-1 text-base text-primeDark font-medium">
                {vehicle.transmission_type || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
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

export default VehicleViewModal;