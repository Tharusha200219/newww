// src/services/driverService.jsx
import axios from 'axios';

// Base URL for your API (adjust this to match your backend URL)

import { API_BASE_URL } from "../config/config";
// Create a new driver
export const createDriver = async (driverData) => {
    try {
        const response = await axios.post(API_BASE_URL, driverData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error creating driver' };
    }
};

// Get all drivers
export const getAllDrivers = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching drivers' };
    }
};

// Get a specific driver by ID
export const getDriverById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching driver' };
    }
};

// Update a driver
export const updateDriver = async (id, driverData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, driverData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error updating driver' };
    }
};

// Delete a driver
export const deleteDriver = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error deleting driver' };
    }
};