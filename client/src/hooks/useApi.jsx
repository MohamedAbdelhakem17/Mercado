import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * A versatile hook for making API requests with support for headers.
 *
 * @param {string} baseEndpoint - The base API endpoint (e.g., `/items`).
 * @returns {Array} - An array containing:
 *                    1. `sendRequest` (Function): A function to initiate the API call.
 *                    2. `loading` (Boolean): The loading state of the API call.
 *                    3. `error` (String|null): Any error that occurred during the API call.
 *                    4. `response` (Object|null): The response data from the API.
 *
 * Usage:
 * const [sendRequest, loading, error, response] = useApi('/items');
 */
const useApi = (baseEndpoint) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    /**
     * Makes an API request.
     *
     * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
     * @param {string} endpoint - Additional endpoint to append to the base (optional).
     * @param {Object} data - The request payload for POST/PUT (optional).
     * @param {Object} headers - Custom headers for the request (optional).
     */
    const sendRequest = useCallback(
        async (method, endpoint = '', data = null, headers = {}) => {
            setLoading(true);
            setError(null);
            setResponse(null);

            const apiUrl = `http://localhost:7698/api/v1${baseEndpoint}${endpoint}`;

            try {
                const options = {
                    method,
                    url: apiUrl,
                    data, // Payload for POST and PUT
                    headers, // Custom headers
                };
                const result = await axios(options);
                setResponse(result.data);
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        },
        [baseEndpoint]
    );

    return [sendRequest, loading, error, response];
};

useApi.propTypes = {
    baseEndpoint: PropTypes.string.isRequired,
};

export default useApi;
