import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./SignIn.css";

function SignIn() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [demoTransactions, setDemoTransactions] = useState([]);
    const [flaggedTransactions, setFlaggedTransactions] = useState([]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/auth/login", credentials);
            setUser(response.data.username);
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Invalid login credentials. Please try again.");
        }
    };

    useEffect(() => {
        // Simulate fetching demo and flagged transaction data
        const fetchDemoData = () => {
            const data = {
                demoTransactions: [
                    { id: 1, date: "2024-09-27", amount: 100, status: "Completed" },
                    { id: 2, date: "2024-09-28", amount: 200, status: "Completed" },
                    { id: 3, date: "2024-09-29", amount: 500, status: "Pending" },
                ],
                flaggedTransactions: [
                    { id: 4, date: "2024-09-30", amount: 3000, status: "Suspicious" },
                ],
            };
            setDemoTransactions(data.demoTransactions);
            setFlaggedTransactions(data.flaggedTransactions);
        };

        fetchDemoData();
    }, []);

    return (
        <div>
            {!user ? (
                <div>
                    <h2>Sign In</h2>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>Welcome, {user}!</h1>

                    {/* Demo Transactions Section */}
                    <h2 className="section-title">🔍 Demo Transactions</h2>
                    <ul className="transactions-list">
                        {demoTransactions.map((txn) => (
                            <li key={txn.id}>
                                <strong>Date:</strong> {txn.date} <br />
                                <strong>Amount:</strong> ${txn.amount} <br />
                                <strong>Status:</strong> {txn.status}
                            </li>
                        ))}
                    </ul>

                    {/* Flagged Transactions Section */}
                    <h2 className="section-title">⚠️ Flagged Transactions</h2>
                    <ul className="transactions-list flagged">
                        {flaggedTransactions.map((txn) => (
                            <li key={txn.id}>
                                <strong>Date:</strong> {txn.date} <br />
                                <strong>Amount:</strong> ${txn.amount} <br />
                                <strong>Status:</strong> {txn.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SignIn;

