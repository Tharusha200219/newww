// src/components/DriverList.jsx
import React, { useState, useEffect } from 'react';
import { 
    getAllDrivers, 
    createDriver, 
    updateDriver, 
    deleteDriver 
} from '../services/driverService';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all drivers on component mount
    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const data = await getAllDrivers();
            setDrivers(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add new driver
    const handleAddDriver = async (driverData) => {
        try {
            const newDriver = await createDriver(driverData);
            setDrivers([...drivers, newDriver]);
        } catch (err) {
            setError(err.message);
        }
    };

    // Update existing driver
    const handleUpdateDriver = async (id, driverData) => {
        try {
            const updatedDriver = await updateDriver(id, driverData);
            setDrivers(drivers.map(driver => 
                driver._id === id ? updatedDriver : driver
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete driver
    const handleDeleteDriver = async (id) => {
        try {
            await deleteDriver(id);
            setDrivers(drivers.filter(driver => driver._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Drivers List</h1>
            {/* Add your form for creating/updating drivers here */}
            <ul>
                {drivers.map(driver => (
                    <li key={driver._id}>
                        {driver.full_name} - {driver.email}
                        {/* Add buttons for update/delete */}
                        <button onClick={() => handleDeleteDriver(driver._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DriverList;