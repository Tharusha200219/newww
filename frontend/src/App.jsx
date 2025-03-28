import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateVehicle from './components/vehicleManagement/vehicleManagementCreate/CreateVehicle';
import VehicleTable from './components/vehicleManagement/vehicleManagementTableView/VehicleTable';
import DriverTable from './components/driver/driverTableView/driverTableView';
import CreateDriver from './components/driver/driverCreate/driverCreate';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';
import Dashboard from '../common/dashboard/Dashboard';
import { useState, useEffect } from 'react';
import * as driverService from './services/driverSrvice';
import { vehicleService } from './services/vehicleService';

function App() {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driverData = await driverService.getAllDrivers();
        const vehicleData = await vehicleService.getAllVehicles();
        setDrivers(driverData);
        setVehicles(vehicleData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900 font-sans">
        <Header />
        <div className="flex flex-1">
          <Sidebar drivers={drivers} vehicles={vehicles} />
          <main className="flex-1 p-6 mt-16 lg:ml-72 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Dashboard drivers={drivers} vehicles={vehicles} />} />
              <Route path="/create-vehicle" element={<CreateVehicle />} />
              <Route path="/driver-table" element={<DriverTable />} />
              <Route path="/vehicle-table" element={<VehicleTable />} />
              <Route path="/create-driver" element={<CreateDriver />} />
              
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;