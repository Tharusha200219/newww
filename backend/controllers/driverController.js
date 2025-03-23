// controllers/driverController.js
import driverService from '../services/driverService.js';

class DriverController {
    async createDriver(req, res) {
        try {
            const driver = await driverService.createDriver(req.body);
            res.status(201).json({
                success: true,
                data: driver
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllDrivers(req, res) {
        try {
            const drivers = await driverService.getAllDrivers();
            res.status(200).json({
                success: true,
                data: drivers
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getDriverById(req, res) {
        try {
            const driver = await driverService.getDriverById(req.params.id);
            res.status(200).json({
                success: true,
                data: driver
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateDriver(req, res) {
        try {
            const driver = await driverService.updateDriver(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: driver
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteDriver(req, res) {
        try {
            const result = await driverService.deleteDriver(req.params.id);
            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new DriverController();