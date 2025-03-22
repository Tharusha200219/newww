import express from "express";
import vehicleManagementController from "../controllers/vehicleManagementController.js";

const router = express.Router();


router.post("/create", vehicleManagementController.createVehicleManagement);
router.get("/", vehicleManagementController.getVehicleManagement);
router.get("/:id", vehicleManagementController.getVehicleManagementById);
router.put("/:id", vehicleManagementController.updateVehicleManagement);
router.delete("/:id", vehicleManagementController.deleteVehicleManagement);

export default router;