import axios from 'axios';

const API_URL = 'http://localhost:8081/api'; // Make sure this URL is correct

// Register user
export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/auth/register`, userData);
};

// Login user
export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/auth/login`, credentials);
};

// Fetch transactions
export const fetchTransactions = async (token) => {
    return await axios.get(`${API_URL}/transactions`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

// Fraud detection API call
export const detectFraud = async (transactionData) => {
    try {
        const response = await axios.post(`${API_URL}/fraud/detect`, transactionData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the fraud detection result
    } catch (error) {
        console.error("Error detecting fraud:", error);
        throw error;
    }
};
