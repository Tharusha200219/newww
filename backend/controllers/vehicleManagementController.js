import { vehicleManagement } from "../models/vehicleManagementModel.js";
const createVehicleManagement = async (req, res) => {
  try {
    const {
      vehicle_id,
      vehicle_type,
      brand,
      model,
      year_of_manufacture,
      seating_capacity,
      fuel_type,
      transmission_type,
      image_upload,
      
    } = req.body;

    if (
      !vehicle_id ||
      !vehicle_type ||
      !brand ||
      !model ||
      !year_of_manufacture ||
      !seating_capacity ||
      !fuel_type ||
      !transmission_type ||
      !image_upload 
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVehicleManagement = new vehicleManagement({
      vehicle_id,
      vehicle_type,
      brand,
      model,
      year_of_manufacture,
      seating_capacity,
      fuel_type,
      transmission_type,
      image_upload,
      
    });

    const savedVehicleManagement = await newVehicleManagement.save();
    res
      .status(201)
      .json({ message: "vehicle added successfully", savedVehicleManagement });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error adding vehicle", error: error.message });
  }
};

const getVehicleManagement = async (req, res) => {
  try {
    const vehicleManagements = await vehicleManagement.find();
    res
      .status(200)
      .json({ message: "vehicle fetched successfully", vehicleManagements });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching vehicle", error: error.message });
  }
};

const getVehicleManagementById = async (req, res) => {
  try {
    const vehicleManagementRecord = await vehicleManagement.findById(
      req.params.id
    );
    if (!vehicleManagementRecord) {
      return res
        .status(404)
        .json({ message: "vehicleManagement not record found" });
    }
    res
      .status(200)
      .json({
        message: "vehicleMnagement fetched successfully",
        vehicleMnagementRecord,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching consumption", error: error.message });
  }
};

const updateVehicleManagement = async (req, res) => {
  try {
    const vehicleManagementRecord = await vehicleManagement.findById(
      req.params.id
    );
    if (!vehicleManagementRecord) {
      return res
        .status(404)
        .json({ message: "vehicleManagement not record found" });
    }
    const updatedVehicleManagement = await vehicleManagement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "vehicle updated successfully", updatedVehicleManagement });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error updating vehicle", error: error.message });
  }
};

const deleteVehicleManagement = async (req, res) => {
  try {
    const vehicleManagementRecord = await vehicleManagement.findById(
      req.params.id
    );
    if (!vehicleManagementRecord) {
      return res.status(404).json({ message: "vehicle not record found" });
    }
    await vehicleManagement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "vehicle deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error deleting vehicle", error: error.message });
  }
};

const vehicleManagementController = {
  createVehicleManagement,
  getVehicleManagement,
  getVehicleManagementById,
  updateVehicleManagement,
  deleteVehicleManagement,
};

export default vehicleManagementController;