import React, { useState, useEffect } from "react";
import axios from "axios";
import './SignIn.css';

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
        if (user) {
            // Simulate fetching demo and flagged transaction data after login
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
        }
    }, [user]);  // Re-fetch data whenever the user state changes

    return (
        <div>
            {!user ? (
                <div className="signin-container">
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
                    <div className="transactions-box">
                        {demoTransactions.map((txn) => (
                            <div className="transaction-card" key={txn.id}>
                                <strong>Date:</strong> {txn.date} <br />
                                <strong>Amount:</strong> ${txn.amount} <br />
                                <strong>Status:</strong> {txn.status}
                            </div>
                        ))}
                    </div>

                    {/* Flagged Transactions Section */}
                    <h2 className="section-title">⚠️ Flagged Transactions</h2>
                    <div className="transactions-box flagged">
                        {flaggedTransactions.map((txn) => (
                            <div className="transaction-card" key={txn.id}>
                                <strong>Date:</strong> {txn.date} <br />
                                <strong>Amount:</strong> ${txn.amount} <br />
                                <strong>Status:</strong> {txn.status}
                            </div>
                        ))}
                    </div>

                    {/* Suggestions Section */}
                    <h2 className="section-title">Suggested Actions</h2>
                    <div className="suggestion-container">
                        <div className="suggestion-card">
                            <h4>🔎 Review the Transaction Details</h4>
                            <p>Ensure the accuracy of the flagged transaction and trace it to the bank.</p>
                            <a href="https://www.axisbank.com/retail/online-services/transactions" target="_blank" rel="noopener noreferrer">
                                Review the transaction details
                            </a>
                        </div>

                        <div className="suggestion-card">
                            <h4>🚨 Report Suspicious Transactions</h4>
                            <p>If the transaction is suspicious, report it to the fraud detection team.</p>
                            <a href="https://www.cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">
                                Report suspicious transactions to the fraud detection team
                            </a>
                        </div>

                        <div className="suggestion-card">
                            <h4>🔄 Block the User Account</h4>
                            <p>If fraudulent activity is confirmed, block the user's account.</p>
                            <a href="https://www.icicibank.com/online-services/account-blocking" target="_blank" rel="noopener noreferrer">
                                Block the user account
                            </a>
                        </div>

                        <div className="suggestion-card">
                            <h4>📞 Contact Customer Support</h4>
                            <p>For further investigation, get in touch with support.</p>
                            <button
                                className="link-button"
                                onClick={() => alert('Customer Support page is under development.')}
                            >
                                Contact customer support (In development)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignIn;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import {
//     ResponsiveContainer,
//     ScatterChart,
//     Scatter,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
// } from "recharts";
// import "./SignIn.css";

// function SignIn() {
//     const [credentials, setCredentials] = useState({ username: "", password: "" });
//     const [user, setUser] = useState(null);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [demoTransactions, setDemoTransactions] = useState([]);
//     const [flaggedTransactions, setFlaggedTransactions] = useState([]);
//     const [keyMetrics, setKeyMetrics] = useState({
//         totalTransactions: 0,
//         flaggedCount: 0,
//         potentialFraud: 0,
//         accuracy: 0,
//     });

//     const transactionData = [
//         { time: "00:00", value: 120, type: "normal" },
//         { time: "03:00", value: 85, type: "normal" },
//         { time: "06:00", value: 210, type: "normal" },
//         { time: "09:00", value: 180, type: "normal" },
//         { time: "12:00", value: 350, type: "normal" },
//         { time: "15:00", value: 420, type: "normal" },
//         { time: "18:00", value: 380, type: "normal" },
//         { time: "21:00", value: 250, type: "normal" },
//         { time: "12:15", value: 980, type: "fraud" },
//         { time: "15:30", value: 1250, type: "fraud" },
//     ];

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
//         const fetchData = () => {
//             const demoData = [
//                 { id: 1, date: "2024-09-27", amount: 100, merchant: "Amazon", status: "Completed" },
//                 { id: 2, date: "2024-09-28", amount: 200, merchant: "Netflix", status: "Completed" },
//                 { id: 3, date: "2024-09-29", amount: 500, merchant: "Best Buy", status: "Pending" },
//             ];

//             const flaggedData = [
//                 { id: 4, date: "2024-09-30", amount: 3000, merchant: "Unknown", status: "Suspicious", reason: "Unusual location" },
//                 { id: 5, date: "2024-10-01", amount: 1500, merchant: "Electronics Store", status: "Suspicious", reason: "High amount for new merchant" },
//             ];

//             setDemoTransactions(demoData);
//             setFlaggedTransactions(flaggedData);
//             setKeyMetrics({
//                 totalTransactions: 1248,
//                 flaggedCount: flaggedData.length,
//                 potentialFraud: 4500,
//                 accuracy: 98.7,
//             });
//         };

//         if (user) {
//             fetchData();
//         }
//     }, [user]);

//     const handleLogout = () => {
//         setUser(null);
//         setCredentials({ username: "", password: "" });
//     };

//     return (
//         <div className="signin-container">
//             {!user ? (
//                 <motion.div
//                     className="login-form"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <h2>Sign In to Your Account</h2>
//                     {errorMessage && <p className="error-message">{errorMessage}</p>}
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label>Username:</label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 value={credentials.username}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter your username"
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Password:</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 value={credentials.password}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter your password"
//                             />
//                         </div>
//                         <button type="submit" className="login-button">Login</button>
//                     </form>
//                 </motion.div>
//             ) : (
//                 <div className="welcome-container">
//                     <motion.div
//                         className="welcome-header"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.2 }}
//                     >
//                         <h1>Welcome back, <span className="username">{user}</span>!</h1>
//                         <p>Here's your fraud detection dashboard overview</p>
//                         <button onClick={handleLogout} className="logout-button">Logout</button>
//                     </motion.div>

//                     <motion.div
//                         className="metrics-section"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.4 }}
//                     >
//                         <h2 className="section-title">📊 Key Metrics</h2>
//                         <div className="metrics-grid">
//                             <div className="metric-card">
//                                 <div className="metric-value">{keyMetrics.totalTransactions}</div>
//                                 <div className="metric-label">Transactions Today</div>
//                             </div>
//                             <div className="metric-card">
//                                 <div className="metric-value">{keyMetrics.flaggedCount}</div>
//                                 <div className="metric-label">Flagged Transactions</div>
//                             </div>
//                             <div className="metric-card">
//                                 <div className="metric-value">${keyMetrics.potentialFraud}</div>
//                                 <div className="metric-label">Potential Fraud</div>
//                             </div>
//                             <div className="metric-card">
//                                 <div className="metric-value">{keyMetrics.accuracy}%</div>
//                                 <div className="metric-label">Detection Accuracy</div>
//                             </div>
//                         </div>
//                     </motion.div>

//                     <motion.div
//                         className="chart-section"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.6 }}
//                     >
//                         <h2 className="section-title">📈 Transaction Activity</h2>
//                         <div className="chart-container">
//                             <ResponsiveContainer width="100%" height={400}>
//                                 <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//                                     <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
//                                     <XAxis dataKey="time" name="Time" />
//                                     <YAxis dataKey="value" name="Amount ($)" />
//                                     <Tooltip cursor={{ strokeDasharray: "3 3" }} />
//                                     <Scatter
//                                         name="Normal"
//                                         data={transactionData.filter((t) => t.type === "normal")}
//                                         fill="#8884d8"
//                                         shape="circle"
//                                     />
//                                     <Scatter
//                                         name="Fraud"
//                                         data={transactionData.filter((t) => t.type === "fraud")}
//                                         fill="#ff7300"
//                                         shape="triangle"
//                                     />
//                                 </ScatterChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </motion.div>

//                     <div className="transactions-sections">
//                         <motion.div
//                             className="transactions-section"
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.8 }}
//                         >
//                             <h2 className="section-title">🔍 Recent Transactions</h2>
//                             <div className="transactions-list">
//                                 {demoTransactions.map((txn) => (
//                                     <div key={txn.id} className="transaction-card">
//                                         <div className="transaction-header">
//                                             <span className="transaction-merchant">{txn.merchant}</span>
//                                             <span className="transaction-amount">${txn.amount}</span>
//                                         </div>
//                                         <div className="transaction-details">
//                                             <span className="transaction-date">{txn.date}</span>
//                                             <span className={`transaction-status ${txn.status.toLowerCase()}`}>
//                                                 {txn.status}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </motion.div>

//                         <motion.div
//                             className="transactions-section flagged"
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 1.0 }}
//                         >
//                             <h2 className="section-title">⚠ Flagged Transactions</h2>
//                             <div className="transactions-list">
//                                 {flaggedTransactions.map((txn) => (
//                                     <div key={txn.id} className="transaction-card flagged">
//                                         <div className="transaction-header">
//                                             <span className="transaction-merchant">{txn.merchant}</span>
//                                             <span className="transaction-amount">${txn.amount}</span>
//                                         </div>
//                                         <div className="transaction-details">
//                                             <span className="transaction-date">{txn.date}</span>
//                                             <span className="transaction-status suspicious">{txn.status}</span>
//                                         </div>
//                                         <div className="transaction-reason">
//                                             <strong>Reason:</strong> {txn.reason}
//                                         </div>
//                                         <div className="transaction-actions">
//                                             <button className="action-button approve">Approve</button>
//                                             <button className="action-button deny">Deny</button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SignIn;
