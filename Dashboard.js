import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(null); // Added state for active card

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

  return (
    <div className={`dashboard-container ${isScrolled ? "scrolled" : ""}`}>
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
        transition={{ duration: 0.5 }}
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
              src="https://media.licdn.com/dms/image/C5612AQFGKnchbUDRfg/article-cover_image-shrink_720_1280/0/1636688482799?e=2147483647&v=beta&t=kv_ZR9YkfyVHyHVBgHiI6LeXCzgXVVUo4JX8A6N8TZo"
              alt="AI-powered fraud detection"
            />
            <p className="legend">🤖 AI-Powered Fraud Detection</p>
          </div>
          <div>
            <img
              src="https://media.licdn.com/dms/image/D4D12AQFdUZmKZLH8yQ/article-cover_image-shrink_720_1280/0/1698851269979?e=2147483647&v=beta&t=_WYG-GKEp-yYTdrSPjN19aOfZszngdhstgwwXBfkOQw"
              alt="Secure transactions"
            />
            <p className="legend">🔒 Secure & Reliable Transactions</p>
          </div>
        </Carousel>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        className="cards-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${activeCard === card.id ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {activeCard === card.id && (
              <div className="card-expanded">
                <p>{card.moreInfo}</p>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
