// models/driverModel.js
import mongoose from "mongoose";

const driverSchema = mongoose.Schema(
    {
        driver_id: {
            type: Number,
            required: false,
        },
        full_name: {
            type: String,
            required: false,
        },
        contact_number: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        license_number: {
            type: String,
            required: false,
        },
        year_of_experience: {
            type: String,
            required: false,
        },
        availability_status: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Driver = mongoose.model('drivers', driverSchema);
export default Driver;  // Changed to default export