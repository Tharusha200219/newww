import mongoose from 'mongoose';

const driverSchema = mongoose.Schema(
  {
    driver_id: { type: Number, required: true },
    full_name: { type: String, required: true },
    contact_number: { type: String, required: true },
    email: { type: String, required: true },
    license_number: { type: String, required: true },
    year_of_experience: { type: String, required: true },
    availability_status: { type: String, required: true },
  },
  { timestamps: true }
);

const Driver = mongoose.model('drivers', driverSchema);
export default Driver;