import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    }, 1000); // Simulated loading time
    return () => clearTimeout(timer);
  }, []);

  const location = useLocation(); // Use the router context already provided by index.js

  console.log('Current path:', location.pathname);

  return (
    <>
      {loading ? (
        <div className="loading-message">Loading your fraud detection system...</div>
      ) : (
        <div className="app-container">
          <nav className="navbar">
            <Link className="nav-link" to="/signin">Sign In</Link>
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/fraud-detection">Fraud Detection</Link> {/* Add link to Fraud Detection */}

          </nav>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/signin"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SignIn />
                  </motion.div>
                }
              />
              <Route
                path="/register"
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Register />
                  </motion.div>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Dashboard />
                  </motion.div>
                }
              />
              <Route
                path="/fraud-detection"
                element={
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FraudDetection />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default App;