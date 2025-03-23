import express from 'express';
import {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver
} from '../controllers/driverController.js'; // Adjust path based on your structure

const router = express.Router();

// Route to create a new driver
router.post('/', createDriver);

// Route to get all drivers
router.get('/', getAllDrivers);

// Route to get a specific driver by ID
router.get('/:id', getDriverById);

// Route to update a driver
router.put('/:id', updateDriver);

// Route to delete a driver
router.delete('/:id', deleteDriver);

export default router;