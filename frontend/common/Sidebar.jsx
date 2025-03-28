import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = ({ drivers, vehicles }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/driver-table', label: 'Drivers', icon: '👤' },
    { path: '/vehicle-table', label: 'Vehicles', icon: '🚗' },
    { path: '/create-vehicle', label: 'Add Vehicle', icon: '➕' },
    { path: '/create-driver', label: 'Add Vehicle', icon: '➕' },
  ];

  return (
    <div className={`bg-gradient-to-b from-blue-800 to-blue-600 text-white fixed left-0 z-5 transition-all duration-300 ${isOpen ? 'w-72' : 'w-20'} top-16 bottom-0`}>
      <div className="p-6 flex justify-between items-center">
        {isOpen && <span className="text-2xl font-extrabold tracking-tight">Admin Panel</span>}
        <button onClick={toggleSidebar} className="focus:outline-none text-2xl hover:text-blue-200 transition duration-200">
          {isOpen ? '←' : '→'}
        </button>
      </div>

      <nav className="mt-10">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-4 hover:bg-blue-700 transition duration-200 ${
              location.pathname === item.path ? 'bg-blue-900 shadow-inner' : ''
            }`}
          >
            <span className="text-2xl mr-4">{item.icon}</span>
            {isOpen && <span className="text-lg font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {isOpen && (
        <div className="p-6 mt-12">
          <div className="bg-blue-900 rounded-xl p-4 shadow-lg">
            <p className="text-sm font-semibold">Total Drivers: <span className="text-xl">{drivers.length}</span></p>
            <p className="text-sm font-semibold mt-2">Total Vehicles: <span className="text-xl">{vehicles.length}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;