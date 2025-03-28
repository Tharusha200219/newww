// controllers/vehicleManagementController.js
import { vehicleManagement } from '../models/vehicleManagementModel.js'; // Adjust the import based on your structure
import multer from 'multer';
import path from 'path';

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb('Error: Images only (jpeg, jpg, png)');
    }
}).single('image_upload');

// Controller functions
export const createVehicle = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        try {
            const {
                vehicle_id,
                vehicle_type,
                brand,
                model,
                year_of_manufacture,
                seating_capacity,
                fuel_type,
                transmission_type
            } = req.body;

            // Check if vehicle_id already exists
            const existingVehicle = await vehicleManagement.findOne({ vehicle_id });
            if (existingVehicle) {
                return res.status(400).json({ message: 'Vehicle ID already exists' });
            }

            const vehicleData = {
                vehicle_id,
                vehicle_type,
                brand,
                model,
                year_of_manufacture,
                seating_capacity,
                fuel_type,
                transmission_type,
                image_upload: req.file ? req.file.path : ''
            };

            const newVehicle = new vehicleManagement(vehicleData);
            await newVehicle.save();

            // Send only one response
            return res.status(201).json({
                message: 'Vehicle created successfully',
                vehicle: newVehicle
            });

        } catch (error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};
export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleManagement.find();
        res.status(200).json(vehicles);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await vehicleManagement.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateVehicle = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        try {
            const updateData = { ...req.body };
            if (req.file) {
                updateData.image_upload = req.file.path;
            }

            const vehicle = await vehicleManagement.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!vehicle) {
                return res.status(404).json({ message: 'Vehicle not found' });
            }

            res.status(200).json({
                message: 'Vehicle updated successfully',
                vehicle
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    });
};

export const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleManagement.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};