// src/components/vehicleManagementView/ViewVehicleModal.jsx
import React from 'react';

const ViewVehicleModal = ({ isOpen, onClose, vehicle }) => {
  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 sm:mx-0 p-6 transform transition-all duration-300 scale-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Vehicle Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {/* Image */}
          {vehicle.image_upload && (
            <div className="flex justify-center">
              <img
                src={`http://localhost:5001/${vehicle.image_upload}`}
                alt={vehicle.model}
                className="h-48 w-48 object-cover rounded-lg shadow-md"
                onError={(e) => (e.target.src = '../../../assets/1.png')}
              />
            </div>
          )}

          {/* Vehicle Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-semibold text-gray-500">Vehicle ID:</span>
              <p className="text-lg text-gray-900">{vehicle.vehicle_id}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Type:</span>
              <p className="text-lg text-gray-900">{vehicle.vehicle_type}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Brand:</span>
              <p className="text-lg text-gray-900">{vehicle.brand}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Model:</span>
              <p className="text-lg text-gray-900">{vehicle.model}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Year:</span>
              <p className="text-lg text-gray-900">{vehicle.year_of_manufacture}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Capacity:</span>
              <p className="text-lg text-gray-900">{vehicle.seating_capacity}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Fuel Type:</span>
              <p className="text-lg text-gray-900">{vehicle.fuel_type}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-500">Transmission:</span>
              <p className="text-lg text-gray-900">{vehicle.transmission_type}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-gray-600 hover:to-gray-700 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewVehicleModal;