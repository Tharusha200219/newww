// routes/vehicleManagementRoute.js
import express from 'express';
import {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
} from '../controllers/vehicleManagementController.js';

const router = express.Router();

// Routes
router.post('/', createVehicle);
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

export default router;