// vehicleManagementTableView.jsx
import React, { useState, useEffect } from 'react';
import vehicleManagementService from '../../../services/vehicleManagement';

const VehicleManagementTableView = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleManagementService.getAllVehicles();
      setVehicles(data.vehicleManagements || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error fetching vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleManagementService.deleteVehicle(id);
        fetchVehicles(); // Refresh the list
      } catch (err) {
        setError(err.message || 'Error deleting vehicle');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="vehicle-management-table">
      <h2>Vehicle Management</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Vehicle ID</th>
            <th style={tableHeaderStyle}>Type</th>
            <th style={tableHeaderStyle}>Brand</th>
            <th style={tableHeaderStyle}>Model</th>
            <th style={tableHeaderStyle}>Year</th>
            <th style={tableHeaderStyle}>Capacity</th>
            <th style={tableHeaderStyle}>Fuel</th>
            <th style={tableHeaderStyle}>Transmission</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle._id}>
              <td style={tableCellStyle}>{vehicle.vehicle_id}</td>
              <td style={tableCellStyle}>{vehicle.vehicle_type}</td>
              <td style={tableCellStyle}>{vehicle.brand}</td>
              <td style={tableCellStyle}>{vehicle.model}</td>
              <td style={tableCellStyle}>{vehicle.year_of_manufacture}</td>
              <td style={tableCellStyle}>{vehicle.seating_capacity}</td>
              <td style={tableCellStyle}>{vehicle.fuel_type}</td>
              <td style={tableCellStyle}>{vehicle.transmission_type}</td>
              <td style={tableCellStyle}>
                <button 
                  onClick={() => handleDelete(vehicle._id)}
                  style={{ marginRight: '5px', backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Delete
                </button>
                {/* Add Edit button and functionality as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default VehicleManagementTableView;