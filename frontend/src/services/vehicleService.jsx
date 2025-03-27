// src/services/vehicleService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/vehicleManagement';

export const vehicleService = {
  // Create a new vehicle
  async createVehicle(formData) {
    try {
      console.log('FormData:', [...formData]); // Log form data entries
      const response = await axios.post(`${API_URL}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create Vehicle Error:', error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
  },

  // Get all vehicles
  async getAllVehicles() {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get vehicle by ID
  async getVehicleById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update vehicle
  async updateVehicle(id, formData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete vehicle
  async deleteVehicle(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};