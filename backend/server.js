// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import vehicleManagementRoutes from './routes/vehicleManagementRoute.js';
import driverRoutes from './routes/driverManagementRoute.js';
import path from 'path';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Routes
app.use('/api/vehicleManagement', vehicleManagementRoutes);
app.use('/api/driver', driverRoutes);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));