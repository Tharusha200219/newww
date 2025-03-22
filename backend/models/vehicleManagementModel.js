import mongoose from "mongoose";

const vehicleManagemntschema = mongoose.Schema(
    {
        vehicle_id : {
            type : Number,
            required:false,
        },
        vehicle_type : {
            type : String,
            required : false,
        },

        brand: {
            type : String,
            required : false,
        },
        
        model : {
            type : String,
            required : false,
        },
        year_of_manufacture: {
            type : String,
            required : false,
        },
        seating_capacity : {
            type : String,
            required : false,
        },
        fuel_type : {
            type : String,
            required : false,
        },
        transmission_type : {
            type : String,
            required : false,
        },
        image_upload : {
            type : String,
            required : false,
        },
      



    },
    {
        timestamps: true,
    }
);


export const vehicleManagement  = mongoose.model('vehicleManagements',vehicleManagemntschema);