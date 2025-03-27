import React, { useState } from 'react';
import { vehicleService } from '../../../services/vehicleService';

const DeleteVehicleModal = ({ isOpen, onClose, vehicle, onSuccess }) => {
  const [error, setError] = useState('');

  const handleDeleteConfirm = async () => {
    try {
      await vehicleService.deleteVehicle(vehicle._id);
      onSuccess(); // Notify parent of success
    } catch (err) {
      setError(err.message || 'Error deleting vehicle');
    }
  };

  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-4">
          Are you sure you want to delete vehicle "{vehicle.model}" (ID: {vehicle.vehicle_id})?
        </p>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVehicleModal;