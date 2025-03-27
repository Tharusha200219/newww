import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateVehicle from './components/vehicleManagement/vehicleManagementCreate/CreateVehicle';
import VehicleTable from './components/vehicleManagement/vehicleManagementTableView/VehicleTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VehicleTable />} />
        <Route path="/create-vehicle" element={<CreateVehicle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;