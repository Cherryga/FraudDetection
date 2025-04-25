// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import "./SignIn.css";

// function SignIn() {
//     const [credentials, setCredentials] = useState({ username: "", password: "" });
//     const [user, setUser] = useState(null);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [demoTransactions, setDemoTransactions] = useState([]);
//     const [flaggedTransactions, setFlaggedTransactions] = useState([]);

//     const handleChange = (e) => {
//         setCredentials({
//             ...credentials,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8081/auth/login", credentials);
//             setUser(response.data.username);
//             setErrorMessage("");
//         } catch (error) {
//             setErrorMessage("Invalid login credentials. Please try again.");
//         }
//     };

//     useEffect(() => {
//         // Simulate fetching demo and flagged transaction data
//         const fetchDemoData = () => {
//             const data = {
//                 demoTransactions: [
//                     { id: 1, date: "2024-09-27", amount: 100, status: "Completed" },
//                     { id: 2, date: "2024-09-28", amount: 200, status: "Completed" },
//                     { id: 3, date: "2024-09-29", amount: 500, status: "Pending" },
//                 ],
//                 flaggedTransactions: [
//                     { id: 4, date: "2024-09-30", amount: 3000, status: "Suspicious" },
//                 ],
//             };
//             setDemoTransactions(data.demoTransactions);
//             setFlaggedTransactions(data.flaggedTransactions);
//         };

//         fetchDemoData();
//     }, []);

//     return (
//         <div>
//             {!user ? (
//                 <div>
//                     <h2>Sign In</h2>
//                     {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//                     <form onSubmit={handleSubmit}>
//                         <div>
//                             <label>Username:</label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 value={credentials.username}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label>Password:</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={credentials.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <button type="submit">Login</button>
//                     </form>
//                 </div>
//             ) : (
//                 <div>
//                     <h1>Welcome, {user}!</h1>

//                     {/* Demo Transactions Section */}
//                     <h2 className="section-title">🔍 Demo Transactions</h2>
//                     <ul className="transactions-list">
//                         {demoTransactions.map((txn) => (
//                             <li key={txn.id}>
//                                 <strong>Date:</strong> {txn.date} <br />
//                                 <strong>Amount:</strong> ${txn.amount} <br />
//                                 <strong>Status:</strong> {txn.status}
//                             </li>
//                         ))}
//                     </ul>

//                     {/* Flagged Transactions Section */}
//                     <h2 className="section-title">⚠️ Flagged Transactions</h2>
//                     <ul className="transactions-list flagged">
//                         {flaggedTransactions.map((txn) => (
//                             <li key={txn.id}>
//                                 <strong>Date:</strong> {txn.date} <br />
//                                 <strong>Amount:</strong> ${txn.amount} <br />
//                                 <strong>Status:</strong> {txn.status}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SignIn;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./SignIn.css"; // You'll need to create this CSS file

function SignIn() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [demoTransactions, setDemoTransactions] = useState([]);
    const [flaggedTransactions, setFlaggedTransactions] = useState([]);
    const [keyMetrics, setKeyMetrics] = useState({});
    const [recentAlerts, setRecentAlerts] = useState([]);

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
        // Simulate fetching demo and flagged transaction data, key metrics, and recent alerts
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
                keyMetrics: {
                    totalTransactions: 150,
                    successfulTransactions: 140,
                    failedTransactions: 10,
                    flaggedCount: 2,
                },
                recentAlerts: [
                    { id: 1, message: "Large transaction detected on 2024-09-30", severity: "High" },
                    { id: 2, message: "Multiple login attempts detected", severity: "Medium" },
                ],
            };
            setDemoTransactions(data.demoTransactions);
            setFlaggedTransactions(data.flaggedTransactions);
            setKeyMetrics(data.keyMetrics);
            setRecentAlerts(data.recentAlerts);
        };

        fetchDemoData();
    }, []);

    return (
        <div className="signin-container">
            {!user ? (
                <motion.div 
                    className="login-card"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to your fraud detection dashboard</p>
                    </div>
                    
                    {errorMessage && (
                        <motion.div 
                            className="error-message"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {errorMessage}
                        </motion.div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <motion.button 
                            type="submit" 
                            className="login-button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Login
                        </motion.button>
                    </form>
                    
                    <div className="login-footer">
                        <p>Don't have an account? <a href="#">Contact admin</a></p>
                    </div>
                </motion.div>
            ) : (
                <div className="dashboard-container">
                    <header className="dashboard-header">
                        <h1>Welcome back, {user}!</h1>
                        <p>Here's what's happening with your fraud detection system</p>
                    </header>

                    {/* Key Metrics Section */}
                    <section className="metrics-section">
                        <h2 className="section-title">
                            <span className="icon">📊</span> Key Metrics
                        </h2>
                        <div className="metrics-grid">
                            <div className="metric-card">
                                <h3>Total Transactions</h3>
                                <p className="metric-value">{keyMetrics.totalTransactions}</p>
                            </div>
                            <div className="metric-card">
                                <h3>Successful</h3>
                                <p className="metric-value success">{keyMetrics.successfulTransactions}</p>
                            </div>
                            <div className="metric-card">
                                <h3>Failed</h3>
                                <p className="metric-value warning">{keyMetrics.failedTransactions}</p>
                            </div>
                            <div className="metric-card">
                                <h3>Flagged</h3>
                                <p className="metric-value danger">{keyMetrics.flaggedCount}</p>
                            </div>
                        </div>
                    </section>

                    {/* Recent Alerts Section */}
                    <section className="alerts-section">
                        <h2 className="section-title">
                            <span className="icon">🚨</span> Recent Alerts
                        </h2>
                        <div className="alerts-grid">
                            {recentAlerts.map((alert) => (
                                <motion.div 
                                    key={alert.id}
                                    className={`alert-card ${alert.severity.toLowerCase()}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="alert-header">
                                        <span className="severity-badge">{alert.severity}</span>
                                    </div>
                                    <p className="alert-message">{alert.message}</p>
                                    <button className="alert-action">View Details</button>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Transactions Section */}
                    <section className="transactions-section">
                        <div className="transactions-column">
                            <h2 className="section-title">
                                <span className="icon">🔍</span> Demo Transactions
                            </h2>
                            <div className="transactions-list">
                                {demoTransactions.map((txn) => (
                                    <motion.div 
                                        key={txn.id}
                                        className="transaction-card"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="transaction-info">
                                            <span className="transaction-date">{txn.date}</span>
                                            <span className={`transaction-status ${txn.status.toLowerCase()}`}>
                                                {txn.status}
                                            </span>
                                        </div>
                                        <div className="transaction-amount">${txn.amount}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="transactions-column">
                            <h2 className="section-title">
                                <span className="icon">⚠️</span> Flagged Transactions
                            </h2>
                            <div className="transactions-list">
                                {flaggedTransactions.map((txn) => (
                                    <motion.div 
                                        key={txn.id}
                                        className="transaction-card flagged"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="transaction-info">
                                            <span className="transaction-date">{txn.date}</span>
                                            <span className="transaction-status suspicious">{txn.status}</span>
                                        </div>
                                        <div className="transaction-amount">${txn.amount}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

export default SignIn;
