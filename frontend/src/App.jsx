// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleManagementTableView from './pages/vehicleManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/vehicleManagement" element={<VehicleManagementTableView />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;