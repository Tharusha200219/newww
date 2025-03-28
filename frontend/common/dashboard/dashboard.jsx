import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = ({ drivers, vehicles }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (drivers.length && vehicles.length) setLoading(false);
  }, [drivers, vehicles]);

  const driverStatusData = {
    labels: ['Available', 'Unavailable'],
    datasets: [{
      data: [
        drivers.filter(d => d.availability_status?.toString().toLowerCase() === 'available' || d.availability_status === true).length,
        drivers.filter(d => d.availability_status?.toString().toLowerCase() === 'unavailable' || d.availability_status === false).length
      ],
      backgroundColor: ['#34D399', '#F87171'],
      hoverBackgroundColor: ['#2DD4BF', '#FCA5A5'],
    }],
  };

  const vehicleTypeData = {
    labels: [...new Set(vehicles.map(v => v.vehicle_type))],
    datasets: [{
      label: 'Vehicles by Type',
      data: [...new Set(vehicles.map(v => v.vehicle_type))].map(type => 
        vehicles.filter(v => v.vehicle_type === type).length
      ),
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
      borderColor: '#3B82F6',
      borderWidth: 1,
      hoverBackgroundColor: '#60A5FA',
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#1F2937', font: { size: 14 } } },
      title: { display: true, text: '', color: '#1F2937', font: { size: 18 } },
      tooltip: { backgroundColor: '#111827', titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#1F2937' } },
      x: { ticks: { color: '#1F2937' } },
    },
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-600 text-xl animate-pulse">Loading...</div>;

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Driver Availability</h2>
          <Pie data={driverStatusData} options={{ ...chartOptions, title: { text: 'Driver Status' } }} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Vehicle Distribution</h2>
          <Bar data={vehicleTypeData} options={{ ...chartOptions, title: { text: 'Vehicles by Type' } }} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-lg font-semibold">Total Drivers</h3>
          <p className="text-4xl font-bold mt-2">{drivers.length}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-lg font-semibold">Total Vehicles</h3>
          <p className="text-4xl font-bold mt-2">{vehicles.length}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
          <h3 className="text-lg font-semibold">Active Drivers</h3>
          <p className="text-4xl font-bold mt-2">
            {drivers.filter(d => d.availability_status?.toString().toLowerCase() === 'available' || d.availability_status === true).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;