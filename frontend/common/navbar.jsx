import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo and Brand Name */}
      <div className="navbar-brand">
        <img src="/path-to-car-icon.png" alt="Car Icon" className="car-icon" />
        <div className="brand-text">
          <span className="prime">Prime</span>
          <span className="ride">Ride</span>
          <p className="tagline">FUTURE-READY RIDES!</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <a href="/tour-package-management" className="nav-link">
          TOUR PACKAGE MANAGEMENT
        </a>
        <a href="/Vehiclemanagementcreate" className="nav-link">
          VEHICLE RENT MANAGEMENT
        </a>
        <a href="/health-report-generation" className="nav-link">
          HEALTH REPORT GENERATION
        </a>
      </div>

      {/* Profile Dropdown */}
      <div className="profile-dropdown">
        <span className="profile-icon">👤</span>
        <span className="profile-text">Profile</span>
        <span className="dropdown-arrow">▼</span>
      </div>
    </div>
  );
};

export default Navbar;