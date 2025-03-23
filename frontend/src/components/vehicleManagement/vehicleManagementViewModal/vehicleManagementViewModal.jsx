import React from 'react';

const VehicleViewModal = ({ vehicle, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full space-y-6 shadow-lg">
        <h3 className="text-2xl font-bold text-primeDark text-center">
          Vehicle Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Vehicle ID
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.vehicle_id || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Vehicle Type
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.vehicle_type || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Brand
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.brand || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Model
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.model || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Year of Manufacture
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.year_of_manufacture || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Seating Capacity
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.seating_capacity || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Fuel Type
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.fuel_type || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Transmission Type
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.transmission_type || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primeGray">
              Image
            </label>
            <p className="mt-1 text-sm text-primeDark">{vehicle.image_upload || 'N/A'}</p>
            {/* If you have an actual image URL, you can display it like this:
            {vehicle.image_upload && (
              <img src={vehicle.image_upload} alt="Vehicle" className="mt-2 w-full h-40 object-cover rounded-md" />
            )}
            */}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primeTeal text-white rounded-md hover:bg-primeDark transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleViewModal;