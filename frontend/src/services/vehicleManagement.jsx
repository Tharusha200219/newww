// service.jsx
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export const vehicleManagementService = {
  // Create a new vehicle
  createVehicle: async (vehicleData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/vehicleManagement/create`, vehicleData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all vehicles
  getAllVehicles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vehicleManagement`);
      console.log('Response data:', response.data); // Debug
      return response.data;
    } catch (error) {
      console.error('Fetch error:', error.response || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Get vehicle by ID
  getVehicleById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vehicleManagement/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update vehicle
  updateVehicle: async (id, vehicleData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/vehicleManagement/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete vehicle
  deleteVehicle: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/vehicleManagement/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default vehicleManagementService;