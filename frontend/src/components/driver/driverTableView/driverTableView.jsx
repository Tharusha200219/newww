import React, { useState, useEffect } from 'react';
import * as driverService from '../../../services/driverSrvice'; // Corrected path
import DriverViewModal from '../driverViewModal/driverViewModal'; // Adjusted path
import DriverUpdateModal from '../driverUpdate/driverUpdateModal'; // Adjusted path

const DriverTableView = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage] = useState(5);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await driverService.getAllDrivers();
      setDrivers(data);
      setFilteredDrivers(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error fetching drivers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      try {
        await driverService.deleteDriver(id);
        fetchDrivers();
      } catch (err) {
        setError(err.message || 'Error deleting driver');
      }
    }
  };

  const handleView = (driver) => {
    setSelectedDriver(driver);
    setIsViewModalOpen(true);
  };

  const handleUpdate = (driver) => {
    setSelectedDriver(driver);
    setIsUpdateModalOpen(true);
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedDriver(null);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
    const filtered = drivers.filter(
      (driver) =>
        driver.driver_id?.toString().includes(term) ||
        driver.full_name?.toLowerCase().includes(term) ||
        driver.email?.toLowerCase().includes(term)
    );
    setFilteredDrivers(filtered);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredDrivers].sort((a, b) => {
      const aValue = a[field]?.toString().toLowerCase() || '';
      const bValue = b[field]?.toString().toLowerCase() || '';
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
    setFilteredDrivers(sorted);
  };

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);
  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return (
      <div className="min-h-screen bg-primeLight flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-lg shadow-md animate-fade-in">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primeLight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-4xl font-extrabold text-primeDark tracking-tight">
            Driver Management
          </h2>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search drivers by ID, name, or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full sm:w-80 pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primeTeal focus:border-primeTeal sm:text-sm transition-all duration-300 ease-in-out hover:border-primeDark"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primeGray"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <svg
                className="animate-spin h-10 w-10 text-primeTeal"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          ) : filteredDrivers.length === 0 ? (
            <div className="text-center py-16 text-primeGray text-lg">
              No drivers found. Try adjusting your search.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primeDark">
                    <tr>
                      {[
                        { label: 'Driver ID', field: 'driver_id' },
                        { label: 'Name', field: 'full_name' },
                        { label: 'Contact', field: 'contact_number' },
                        { label: 'Email', field: 'email' },
                        { label: 'License', field: 'license_number' },
                        { label: 'Experience', field: 'year_of_experience' },
                        { label: 'Status', field: 'availability_status' },
                        { label: 'Actions', field: null },
                      ].map((header, index) => (
                        <th
                          key={index}
                          onClick={() => header.field && handleSort(header.field)}
                          className={`px-6 py-4 text-left text-xs font-semibold text-primeLight uppercase tracking-wider ${header.field ? 'cursor-pointer hover:bg-primeTeal transition-all duration-200' : ''}`}
                        >
                          <div className="flex items-center">
                            {header.label}
                            {header.field && sortField === header.field && (
                              <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray- driver">
                    {currentDrivers.map((driver, index) => (
                      <tr
                        key={driver._id}
                        className={`transition-all duration-300 ease-in-out ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-primeLight/50`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primeDark font-medium">
                          {driver.driver_id || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primeDark">
                          {driver.full_name || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primeDark">
                          {driver.contact_number || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primeDark">
                          {driver.email || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primeDark">
                          {driver.license_number || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primeDark">
                          {driver.year_of_experience || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primeDark">
                          {driver.availability_status || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                          <button
                            onClick={() => handleView(driver)}
                            className="px-4 py-2 bg-primeTeal text-primeDark font-semibold rounded-lg shadow-sm hover:bg-primeTeal/80 focus:outline-none focus:ring-2 focus:ring-primeTeal transition-all duration-300 ease-in-out transform hover:scale-105"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleUpdate(driver)}
                            className="px-4 py-2 bg-yellow-500 text-primeDark font-semibold rounded-lg shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(driver._id)}
                            className="px-4 py-2 bg-red-500 text-primeLight font-semibold rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300 ease-in-out transform hover:scale-105"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-gray-50 border-t border-gray-200">
                  <div className="text-sm text-primeGray mb-4 sm:mb-0">
                    Showing {indexOfFirstDriver + 1} to {Math.min(indexOfLastDriver, filteredDrivers.length)} of {filteredDrivers.length} drivers
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primeDark hover:bg-primeTeal hover:text-primeLight'} transition-all duration-300 ease-in-out`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium ${currentPage === index + 1 ? 'bg-primeTeal text-primeLight' : 'text-primeDark hover:bg-primeTeal hover:text-primeLight'} transition-all duration-300 ease-in-out`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primeDark hover:bg-primeTeal hover:text-primeLight'} transition-all duration-300 ease-in-out`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isViewModalOpen && selectedDriver && (
        <DriverViewModal driver={selectedDriver} onClose={closeModals} />
      )}
      {isUpdateModalOpen && selectedDriver && (
        <DriverUpdateModal driver={selectedDriver} onClose={closeModals} onUpdate={fetchDrivers} />
      )}
    </div>
  );
};

export default DriverTableView;