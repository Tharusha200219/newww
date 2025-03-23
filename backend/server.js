// server.js (or your main backend file)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import vehicleManagementRoutes from './routes/vehicleManagementRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers
}));
app.use(express.json());

// Routes
app.use('/api/vehicleManagement', vehicleManagementRoutes);
app.use('/api/drivers', driverRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));