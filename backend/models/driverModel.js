// models/Driver.js
import mongoose from "mongoose";

const driverSchema = mongoose.Schema(
    {
        driver_id: {
            type: Number,
            required: false,
            unique: true
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
            unique: true
        },
        year_of_experience: {
            type: String,
            required: false,
        },
        availability_status: {
            type: String,
            required: false,
            enum: ['available', 'unavailable', 'on-trip']
        }
    },
    {
        timestamps: true,
    }
);

export const Driver = mongoose.model('drivers', driverSchema);