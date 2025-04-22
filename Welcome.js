import React, { useEffect, useState } from "react";
import axios from "axios";

function Welcome() {
    const [transactions, setTransactions] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://localhost:8081/transactions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <h2>Your Past Transactions</h2>
            {transactions.length > 0 ? (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <p>Amount: {transaction.amount}</p>
                            <p>Date: {transaction.date}</p>
                            <p>Status: {transaction.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
        </div>
    );
}

export default Welcome;