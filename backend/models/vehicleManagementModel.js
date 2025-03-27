import mongoose from "mongoose";

const vehicleManagemntschema = mongoose.Schema(
    {
        vehicle_id : {
            type : Number,
            required:true,
        },
        vehicle_type : {
            type : String,
            required : true,
        },

        brand: {
            type : String,
            required : true,
        },
        
        model : {
            type : String,
            required : true,
        },
        year_of_manufacture: {
            type : String,
            required : true,
        },
        seating_capacity : {
            type : String,
            required : true,
        },
        fuel_type : {
            type : String,
            required : true,
        },
        transmission_type : {
            type : String,
            required : true,
        },
        image_upload : {
            type : String,
            required : true,
        },
      
    },
    {
        timestamps: true,
    }
);


export const vehicleManagement  = mongoose.model('vehicleManagements',vehicleManagemntschema);