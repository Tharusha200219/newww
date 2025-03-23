// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleManagementTableView from './pages/vehicleManagement';
import VehicleManagementCreate from './components/vehicleManagement/vehicleManagementCreate/vehicleManagementCreate'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/vehicleManagement" element={<VehicleManagementTableView />} />
          <Route path="/Vehiclemanagementcreate" element={<VehicleManagementCreate />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;