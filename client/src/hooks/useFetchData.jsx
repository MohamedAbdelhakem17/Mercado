import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import axios from 'axios';

/**
 * A custom hook to fetch data from an API endpoint.
 *
 * @param {string} endpoint - The relative API endpoint to fetch data from (e.g., `/items`).
 * @returns {Array} - An array containing:
 *                    1. `data` (Array): The fetched data from the API.
 *                    2. `loading` (Boolean): The loading state of the API call.
 *                    3. `error` (String|null): Any error that occurred during the API call.
 *
 * Usage:
 * const [data, loading, error] = useFetchData('/items');
 */
const useFetchData = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
        setLoading(true);
        try {
            const api_url = `http://localhost:7698/api/v1${endpoint}`;
            const response = await axios.get(api_url);
            setData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (endpoint) {
            getData();
        }
    }, [endpoint]);

    return [data, loading, error];
};

useFetchData.propTypes = {
    endpoint: PropTypes.string.isRequired, 
};

export default useFetchData;
