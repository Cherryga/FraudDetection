// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Dashboard.css'; // You can add styles for both the dashboard and footer here

const Dashboard = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: "🌟 Real-time Monitoring",
      description: "Analyze every transaction in real time, identifying unusual activities with AI precision.",
      moreInfo: "Real-time monitoring leverages AI to detect anomalies instantly, ensuring secure financial operations and protecting against fraud.",
    },
    {
      id: 2,
      title: "📈 Machine Learning Algorithms",
      description: "Utilize advanced machine learning models to detect fraudulent transactions with high accuracy.",
      moreInfo: "Our ML models are trained on large datasets to identify fraud patterns, ensuring accuracy and reducing false positives.",
    },
    {
      id: 3,
      title: "🚨 Flagged Transactions",
      description: "Automatically flag suspicious transactions for further investigation.",
      moreInfo: "Flagged transactions are reviewed in real-time, allowing you to take action immediately and safeguard your assets.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.5 },
    },
  };

  const staggeredVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className={`dashboard-container ${isScrolled ? "scrolled" : ""}`}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      {/* Header Section */}
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="dashboard-title">🚀 AI-Powered Fraud Detection System</h1>
        <p className="dashboard-subtitle">
          Empowering your financial security with cutting-edge AI.
        </p>
      </motion.header>

      {/* Carousel Section */}
      <motion.div
        className="carousel-section"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={4000}
          className="carousel-container"
        >
          <div>
            <img
              src="https://gbgplc.com/media/ejhedsjh/transaction-fraud-social-1.png"
              alt="Real-time monitoring"
            />
            <p className="legend">📊 Real-time Financial Monitoring</p>
          </div>
          <div>
            <img
              src="https://nexocode.com/images/ecommerce-fraud-detection-and-prevention-thumbnail-1.webp"
              alt="AI-powered fraud detection"
            />
            <p className="legend">🤖 AI-Powered Fraud Detection</p>
          </div>
          <div>
            <img
              src="https://cdn.prod.website-files.com/5fbe376a36d4106214faaf3c/62200f9fbd736d0bb2002721_20220302-Credit%20Card%20Fraud%20Detection_Blog%20Thumbnail%20Image.png"
              alt="Secure transactions"
            />
            <p className="legend">🔒 Secure & Reliable Transactions</p>
          </div>
        </Carousel>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        className="cards-section"
        initial="hidden"
        animate="visible"
        variants={staggeredVariants}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`card ${activeCard === card.id ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(null)}
            variants={cardVariants}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {activeCard === card.id && (
              <motion.div
                className="card-expanded"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, delay: 0.8 },
                  },
                }}
              >
                <p>{card.moreInfo}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Fraud Detection Inc. | All Rights Reserved</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Dashboard;
