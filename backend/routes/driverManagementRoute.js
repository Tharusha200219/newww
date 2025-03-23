// routes/driverRoutes.js
import express from 'express';
import driverController from '../controllers/driverController.js';

const router = express.Router();

// Driver Routes
router.post('/', driverController.createDriver);
router.get('/', driverController.getAllDrivers);
router.get('/:id', driverController.getDriverById);
router.put('/:id', driverController.updateDriver);
router.delete('/:id', driverController.deleteDriver);

export default router;