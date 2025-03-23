// services/driverService.js
import { Driver } from '../models/Driver.js';

class DriverService {
    async createDriver(driverData) {
        try {
            const newDriver = new Driver(driverData);
            return await newDriver.save();
        } catch (error) {
            throw new Error(`Error creating driver: ${error.message}`);
        }
    }

    async getAllDrivers() {
        try {
            return await Driver.find();
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    }

    async getDriverById(id) {
        try {
            const driver = await Driver.findById(id);
            if (!driver) {
                throw new Error('Driver not found');
            }
            return driver;
        } catch (error) {
            throw new Error(`Error fetching driver: ${error.message}`);
        }
    }

    async updateDriver(id, driverData) {
        try {
            const driver = await Driver.findByIdAndUpdate(
                id,
                driverData,
                { new: true, runValidators: true }
            );
            if (!driver) {
                throw new Error('Driver not found');
            }
            return driver;
        } catch (error) {
            throw new Error(`Error updating driver: ${error.message}`);
        }
    }

    async deleteDriver(id) {
        try {
            const driver = await Driver.findByIdAndDelete(id);
            if (!driver) {
                throw new Error('Driver not found');
            }
            return { message: 'Driver deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting driver: ${error.message}`);
        }
    }
}

export default new DriverService();