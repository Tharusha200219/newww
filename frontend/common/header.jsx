import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white shadow-lg fixed top-0 left-0 w-full z-50" style={{zIndex: 10}}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold flex items-center space-x-2">
          <span className="bg-white text-blue-600 p-2 rounded-full shadow-md">VA</span>
          <span className="hidden md:inline">Vehicle Admin</span>
        </Link>

        <button className="lg:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <div className="hidden lg:flex items-center space-x-10">
          <Link to="/" className="text-lg font-medium hover:text-blue-200 transition duration-300">Dashboard</Link>
          <Link to="/create-vehicle" className="text-lg font-medium hover:text-blue-200 transition duration-300">Add Vehicle</Link>
          <Link to="/create-driver" className="block text-lg font-medium hover:text-blue-200">Add driver</Link>
          <Link to="/driver-table" className="text-lg font-medium hover:text-blue-200 transition duration-300">Drivers</Link>

          <div className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none">
              <img src="https://via.placeholder.com/32" alt="User" className="w-10 h-10 rounded-full border-2 border-blue-200" />
              <span className="text-lg font-medium">Admin</span>
            </button>
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">
              <Link to="/profile" className="block px-4 py-3 hover:bg-blue-50 rounded-t-xl">Profile</Link>
              <Link to="/logout" className="block px-4 py-3 hover:bg-blue-50 rounded-b-xl">Logout</Link>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-600 lg:hidden p-6 space-y-6 shadow-lg animate-slide-down">
            <Link to="/" className="block text-lg font-medium hover:text-blue-200">Dashboard</Link>
            <Link to="/create-vehicle" className="block text-lg font-medium hover:text-blue-200">Add Vehicle</Link>
            <Link to="/create-driver" className="block text-lg font-medium hover:text-blue-200">Add driver</Link>
            <Link to="/driver-table" className="block text-lg font-medium hover:text-blue-200">Drivers</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;