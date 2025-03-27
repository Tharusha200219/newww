import React, { useState, useEffect, useCallback } from 'react';
import { vehicleService } from '../../../services/vehicleService';
import { Link } from 'react-router-dom';
import EditVehicleModal from '../vehicleManagementUpdate/vehicleManagementUpdateModal';
import DeleteVehicleModal from '../vehicleManagementDelete/vehicleManagementDelete';
import ViewVehicleModal from '../vehicleManagementViewModal/vehicleManagementViewModal'; 

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false); // New state for view modal
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchVehicles = useCallback(async () => {
    try {
      const data = await vehicleService.getAllVehicles();
      setVehicles(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Error fetching vehicles');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const openEditModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setEditModalOpen(true);
  };

  const openDeleteModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setDeleteModalOpen(true);
  };

  const openViewModal = (vehicle) => {
    setSelectedVehicle(vehicle);
    setViewModalOpen(true);
  };

  const handleEditSuccess = (updatedVehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle._id === updatedVehicle._id ? updatedVehicle : vehicle
      )
    );
    setEditModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleDeleteSuccess = () => {
    setVehicles((prevVehicles) =>
      prevVehicles.filter((vehicle) => vehicle._id !== selectedVehicle._id)
    );
    setDeleteModalOpen(false);
    setSelectedVehicle(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">
          Vehicle Fleet
        </h2>
        <Link to="/create-vehicle">
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition duration-300">
            + Add New Vehicle
          </button>
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No vehicles found in the fleet.</p>
        </div>
      ) : (
        <div className="shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Vehicle ID</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Brand</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Model</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Year</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Capacity</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Fuel</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Transmission</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Image</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle._id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-4 px-6 text-gray-900 font-medium">{vehicle.vehicle_id}</td>
                    <td className="py-4 px-6 text-gray-700">{vehicle.vehicle_type}</td>
                    <td className="py-4 px-6 text-gray-700">{vehicle.brand}</td>
                    <td className="py-4 px-6 text-gray-700">{vehicle.model}</td>
                    <td className="py-4 px-6 text-gray-700">{vehicle.year_of_manufacture}</td>
                    <td className="py-4 px-6 text-gray-700">{vehicle.seating_capacity}</td>
                    <td className="py-4 px-6 text-gray-700">{vehicle.fuel_type}</td>
                    <td className="py-4 px-6 text-gray-700">{vehicle.transmission_type}</td>
                    <td className="py-4 px-6">
                      {vehicle.image_upload && (
                        <img
                          src={`http://localhost:5001/${vehicle.image_upload}`}
                          alt={vehicle.model}
                          className="h-12 w-12 rounded-md object-cover shadow-sm"
                          onError={(e) => (e.target.src = '../../../assets/1.png')}
                        />
                      )}
                    </td>
                    <td className="py-4 px-6 flex space-x-3">
                      <button
                        onClick={() => openViewModal(vehicle)}
                        className="text-green-600 hover:text-green-800 font-medium transition duration-200"
                      >
                        View
                      </button>
                      <button
                        onClick={() => openEditModal(vehicle)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(vehicle)}
                        className="text-red-600 hover:text-red-800 font-medium transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <EditVehicleModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        vehicle={selectedVehicle}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Modal */}
      <DeleteVehicleModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        vehicle={selectedVehicle}
        onSuccess={handleDeleteSuccess}
      />

      {/* View Modal */}
      <ViewVehicleModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        vehicle={selectedVehicle}
      />
    </div>
  );
};

export default React.memo(VehicleTable);