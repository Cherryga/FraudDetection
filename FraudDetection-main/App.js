import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignIn from './SignIn';
import Register from './Register';
import Dashboard from './Dashboard';
import FraudDetection from './FraudDetection';
import './App.css'; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <div className="loading-message">Loading your fraud detection system...</div>
      ) : (
        <div className="app-container">
          <nav className="navbar">
            <Link className="nav-link" to="/signin">Sign In</Link>
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/fraud-detection" element={<FraudDetection />} /> 
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
