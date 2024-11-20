import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; // Adjust if needed

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const fetchTransactions = async (token) => {
    return await axios.get(`${API_URL}/transactions`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Add more functions as needed
