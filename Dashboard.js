import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Dashboard.css";

const transactionData = [
  { time: '00:00', value: 120, type: 'normal' },
  { time: '03:00', value: 85, type: 'normal' },
  { time: '06:00', value: 210, type: 'normal' },
  { time: '09:00', value: 180, type: 'normal' },
  { time: '12:00', value: 350, type: 'normal' },
  { time: '15:00', value: 420, type: 'normal' },
  { time: '18:00', value: 380, type: 'normal' },
  { time: '21:00', value: 250, type: 'normal' },
  { time: '12:15', value: 980, type: 'fraud' },
  { time: '15:30', value: 1250, type: 'fraud' },
];

const fraudPatternData = [
  { name: 'Phishing', value: 45 },
  { name: 'Card Skimming', value: 30 },
  { name: 'Account Takeover', value: 15 },
  { name: 'Identity Theft', value: 10 },
];

const performanceData = [
  { month: 'Jan', accuracy: 92, falsePositives: 8 },
  { month: 'Feb', accuracy: 94, falsePositives: 6 },
  { month: 'Mar', accuracy: 95, falsePositives: 5 },
  { month: 'Apr', accuracy: 96, falsePositives: 4 },
  { month: 'May', accuracy: 97, falsePositives: 3 },
  { month: 'Jun', accuracy: 98, falsePositives: 2 },
];

const demoAlerts = [
  {
    id: 1,
    title: "Unusual Transaction Pattern",
    description: "Multiple high-value transactions from new device",
    time: "Today, 14:32",
    amount: "$2,450",
    severity: "high"
  },
  {
    id: 2,
    title: "Geographic Anomaly",
    description: "Transaction from unusual location compared to user history",
    time: "Today, 11:15",
    amount: "$1,780",
    severity: "medium"
  },
  {
    id: 3,
    title: "Velocity Alert",
    description: "Unusually high number of transactions in short period",
    time: "Today, 09:45",
    amount: "$3,210",
    severity: "high"
  }
];

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const dashboardRef = useRef();
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAlertIndex((prev) => (prev + 1) % demoAlerts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard" ref={dashboardRef}>
      {/* Animated Navbar */}
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="navbar-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-icon">🛡️</span>
            <span className="logo-text">FraudShield AI</span>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Carousel Section */}
      <motion.div
        className="carousel-section"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={4000}
          className="carousel-container"
          showStatus={false}
          showArrows={true}
          stopOnHover={true}
          swipeable={true}
          emulateTouch={true}
        >
          <div className="carousel-slide">
            <img
              src="https://gbgplc.com/media/ejhedsjh/transaction-fraud-social-1.png"
              alt="Real-time monitoring"
              className="carousel-image"
            />
            <div className="carousel-overlay"></div>
            <div className="carousel-content">
              <h2>📊 Real-time Financial Monitoring</h2>
              <p>Continuous surveillance of all transactions to detect anomalies as they occur</p>
            </div>
          </div>
          <div className="carousel-slide">
            <img
              src="https://media.licdn.com/dms/image/C5612AQFGKnchbUDRfg/article-cover_image-shrink_720_1280/0/1636688482799?e=2147483647&v=beta&t=kv_ZR9YkfyVHyHVBgHiI6LeXCzgXVVUo4JX8A6N8TZo"
              alt="AI-powered fraud detection"
              className="carousel-image"
            />
            <div className="carousel-overlay"></div>
            <div className="carousel-content">
              <h2>🤖 AI-Powered Fraud Detection</h2>
              <p>Machine learning algorithms that learn and adapt to new fraud patterns</p>
            </div>
          </div>
          <div className="carousel-slide">
            <img
              src="https://media.licdn.com/dms/image/D4D12AQFdUZmKZLH8yQ/article-cover_image-shrink_720_1280/0/1698851269979?e=2147483647&v=beta&t=_WYG-GKEp-yYTdrSPjN19aOfZszngdhstgwwXBfkOQw"
              alt="Secure transactions"
              className="carousel-image"
            />
            <div className="carousel-overlay"></div>
            <div className="carousel-content">
              <h2>🔒 Secure & Reliable Transactions</h2>
              <p>Protecting your financial assets with cutting-edge security technology</p>
            </div>
          </div>
        </Carousel>
      </motion.div>

      {/* Main Content */}
      <main className="main-content">
        {/* Combined Content Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="tab-content"
        >
          {/* Transaction Monitoring Section */}
          <motion.div 
            className="section-header"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            ref={ref}
          >
            <motion.h2 variants={itemVariants}>Real-time Transaction Monitoring</motion.h2>
            <motion.p variants={itemVariants}>
              Our AI system analyzes every transaction as it happens, identifying suspicious patterns instantly.
            </motion.p>
          </motion.div>

          <div className="grid-layout">
            <motion.div 
              className="card chart-card"
              variants={slideUp}
              initial="hidden"
              animate={controls}
            >
              <h3>Transaction Activity</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="time" name="Time" />
                    <YAxis dataKey="value" name="Amount ($)" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter 
                      name="Normal" 
                      data={transactionData.filter(t => t.type === 'normal')} 
                      fill="#8884d8" 
                      shape="circle"
                    />
                    <Scatter 
                      name="Fraud" 
                      data={transactionData.filter(t => t.type === 'fraud')} 
                      fill="#ff7300" 
                      shape="triangle"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              className="card alert-card"
              variants={slideUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.2 }}
            >
              <h3>Common Fraud Patterns</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={fraudPatternData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Analytics Section */}
          <motion.div 
            className="section-header"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ marginTop: '40px' }}
          >
            <motion.h2 variants={itemVariants}>Advanced Analytics</motion.h2>
            <motion.p variants={itemVariants}>
              Deep insights into fraud patterns and system performance.
            </motion.p>
          </motion.div>

          <div className="analytics-grid">
            <motion.div 
              className="card performance-card"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <h3>Model Performance</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" domain={[85, 100]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
                    <Tooltip />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      name="Accuracy (%)"
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="falsePositives" 
                      stroke="#ff7300" 
                      strokeWidth={2} 
                      name="False Positives (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              className="card heatmap-card"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <h3>Fraud Heatmap</h3>
              <div className="heatmap-container">
                <div className="heatmap">
                  {Array.from({ length: 7 }).map((_, day) => (
                    <div key={day} className="heatmap-row">
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <div 
                          key={hour} 
                          className="heatmap-cell"
                          style={{ 
                            opacity: Math.random() * 0.8 + 0.2,
                            backgroundColor: `hsl(${Math.random() * 60}, 100%, 50%)`
                          }}
                          title={`Day ${day+1}, ${hour}:00 - ${hour+1}:00`}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="heatmap-legend">
                  <span>Low</span>
                  <div className="gradient-bar"></div>
                  <span>High</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Demo Transactions Section */}
          <motion.div 
            className="section-header"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ marginTop: '40px' }}
          >
            <motion.h2 variants={itemVariants}>Demo Transaction Alerts</motion.h2>
            <motion.p variants={itemVariants}>
              Example suspicious activities detected by our system (auto-rotating demo)
            </motion.p>
          </motion.div>

          <motion.div 
            className="alerts-carousel-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Carousel
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              selectedItem={activeAlertIndex}
              onChange={setActiveAlertIndex}
              infiniteLoop={true}
              autoPlay={true}
              interval={5000}
              stopOnHover={true}
              swipeable={true}
              emulateTouch={true}
            >
              {demoAlerts.map((alert) => (
                <motion.div 
                  key={alert.id}
                  className="alert-card-carousel"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`alert-severity ${alert.severity}`}></div>
                  <div className="alert-content">
                    <h3>{alert.title}</h3>
                    <p>{alert.description}</p>
                    <div className="alert-meta">
                      <span className="alert-time">{alert.time}</span>
                      <span className="alert-amount">{alert.amount}</span>
                    </div>
                  </div>
                  <div className="alert-actions">
                    <button className="action-button approve">Approve</button>
                    <button className="action-button deny">Deny</button>
                  </div>
                </motion.div>
              ))}
            </Carousel>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🛡️</span>
            <span className="logo-text">FraudShield AI</span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="footer-social">
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">LinkedIn</a>
            <a href="#" className="social-icon">GitHub</a>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} FraudShield AI. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
};

export default Dashboard;
