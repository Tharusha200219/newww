import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Car,
  MapPin,
  Users,
  CalendarDays,
  CreditCard,
  Settings,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    vehicles: 0,
    tours: 0,
    drivers: 0,
    customers: 0,
    bookings: 0,
    payments: 0,
  });

  const fetchCounts = async () => {
    try {
      const [
        vehiclesResponse,
        toursResponse,
        driversResponse,
        customersResponse,
      ] = await Promise.all([
        axios.get("http://localhost:3000/vehicles/count"),
        axios.get("http://localhost:3000/tours/count"),
        axios.get("http://localhost:3000/drivers/count"),
        axios.get("http://localhost:3000/users/count"),
      ]);

      setCounts({
        vehicles: vehiclesResponse.data.count,
        tours: toursResponse.data.count,
        drivers: driversResponse.data.count,
        customers: customersResponse.data.count,
        bookings: 0,
        payments: 0,
      });
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const Card = ({ icon: Icon, title, count, path, color = "blue" }) => {
    const colorClasses = {
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      gray: { bg: "bg-gray-100", text: "text-gray-600" }, // Added gray color
    };

    const colors = colorClasses[color] || colorClasses.blue; // Fallback to blue if invalid color

    return (
      <div
        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 flex items-center space-x-5"
        onClick={() => navigate(path)}
      >
        <div className={`${colors.bg} p-4 rounded-xl`}>
          <Icon className={`${colors.text} w-8 h-8`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className={`text-2xl font-bold ${colors.text}`}>{count}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your PrimeRide operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        <Card
          icon={Car}
          title="Vehicles"
          count={counts.vehicles}
          path="/admin/vehicles"
          color="blue"
        />
        <Card
          icon={MapPin}
          title="Tour Packages"
          count={counts.tours}
          path="/admin/tours"
          color="green"
        />
        <Card
          icon={Users}
          title="Drivers"
          count={counts.drivers}
          path="/admin/drivers"
          color="orange"
        />
        <Card
          icon={Users}
          title="Customers"
          count={counts.customers}
          path="/admin/customers"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          icon={CalendarDays}
          title="Bookings"
          count={counts.bookings}
          path="/admin/bookings"
          color="blue"
        />
        <Card
          icon={CreditCard}
          title="Payments"
          count={counts.payments}
          path="/admin/payments"
          color="green"
        />
        <Card
          icon={Settings}
          title="Settings"
          count=""
          path="/admin/settings"
          color="gray" // Now properly defined
        />
      </div>
    </div>
  );
};

export default Dashboard;
