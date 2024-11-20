// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';  // Move styling to an external CSS file for better management

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [flaggedTransactions, setFlaggedTransactions] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const data = {
//         transactions: [
//           { id: 1, date: '2024-09-27', amount: 100, status: 'Completed' },
//           { id: 2, date: '2024-09-28', amount: 200, status: 'Completed' },
//           { id: 3, date: '2024-09-29', amount: 500, status: 'Pending' },
//         ],
//         flaggedTransactions: [
//           { id: 4, date: '2024-09-30', amount: 3000, status: 'Suspicious' },
//         ],
//       };

//       setTransactions(data.transactions);
//       setFlaggedTransactions(data.flaggedTransactions);
//     };

//     fetchTransactions();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1 className="dashboard-title">Fraud Detection Dashboard</h1>
//         <div className="auth-buttons">
//           {/* Add buttons for sign in, register, etc. */}
//         </div>
//       </header>

//       <div className="transactions-section">
//         <h2 className="section-title">Your Transactions</h2>
//         <ul className="transactions-list">
//           {transactions.map((transaction) => (
//             <li key={transaction.id} className="transaction-item">
//               <span>{transaction.date}</span>
//               <span>${transaction.amount}</span>
//               <span>{transaction.status}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="flagged-section">
//         <h2 className="section-title">Flagged Transactions</h2>
//         <ul className="transactions-list">
//           {flaggedTransactions.length > 0 ? (
//             flaggedTransactions.map((transaction) => (
//               <li key={transaction.id} className="transaction-item flagged">
//                 <span>{transaction.date}</span>
//                 <span>${transaction.amount}</span>
//                 <span>Suspicious</span>
//               </li>
//             ))
//           ) : (
//             <li className="no-flagged">No flagged transactions.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";  
import './Dashboard.css';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [flaggedTransactions, setFlaggedTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = {
        transactions: [
          { id: 1, date: '2024-09-27', amount: 100, status: 'Completed' },
          { id: 2, date: '2024-09-28', amount: 200, status: 'Completed' },
          { id: 3, date: '2024-09-29', amount: 500, status: 'Pending' },
        ],
        flaggedTransactions: [
          { id: 4, date: '2024-09-30', amount: 3000, status: 'Suspicious' },
        ],
      };

      setTransactions(data.transactions);
      setFlaggedTransactions(data.flaggedTransactions);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">AI-Powered Fraud Detection System</h1>
      </header>

      
      <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000} className="carousel-container">
        <div>
          <img src="https://gbgplc.com/media/ejhedsjh/transaction-fraud-social-1.png" alt="Real-time monitoring" />
          <p className="legend">Real-time Financial Monitoring</p>
        </div>
        <div>
          <img src="https://media.licdn.com/dms/image/C5612AQFGKnchbUDRfg/article-cover_image-shrink_720_1280/0/1636688482799?e=2147483647&v=beta&t=kv_ZR9YkfyVHyHVBgHiI6LeXCzgXVVUo4JX8A6N8TZo" alt="AI-powered fraud detection" />
          <p className="legend">AI-Powered Fraud Detection</p>
        </div>
        <div>
          <img src="https://cdn.prod.website-files.com/5c6283f39ea6205dee7cf941/5e77612699e08415b62b9868_online_payment_fraud.jpg" alt="Flagged suspicious transactions" />
          <p className="legend">Flagged Suspicious Transactions</p>
        </div>
        <div>
          <img src="https://innowise.com/wp-content/uploads/2024/02/Transaction-fraud-scoring.png" alt="Dashboard overview" />
          <p className="legend">Dashboard Overview</p>
        </div>
      </Carousel>

   
      <div className="cards-section">
        <div className="card" id ="card1">
          <h3>Real-time Monitoring</h3>
          <p>Analyze every transaction in real time, identifying unusual activities with AI precision.</p>
        </div>
        <div className="card">
          <h3>Machine Learning Algorithms</h3>
          <p>Utilize advanced machine learning models to detect fraudulent transactions with high accuracy.</p>
        </div>
        <div className="card">
          <h3>Flagged Transactions</h3>
          <p>Automatically flag suspicious transactions for further investigation.</p>
        </div>
      </div>
<div className="demo-transactions">
        <h2 className="demo-title">Demo Transactions</h2>
        
        
        <div className="transactions-block">
          <div className="transactions-section">
            <h3 className="section-title">Your Transactions</h3>
            <ul className="transactions-list">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="transaction-item">
                  <span>{transaction.date}</span>
                  <span>${transaction.amount}</span>
                  <span>{transaction.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flagged-section">
            <h3 className="section-title">Flagged Transactions</h3>
            <ul className="transactions-list">
              {flaggedTransactions.length > 0 ? (
                flaggedTransactions.map((transaction) => (
                  <li key={transaction.id} className="transaction-item flagged">
                    <span>{transaction.date}</span>
                    <span>${transaction.amount}</span>
                    <span>Suspicious</span>
                  </li>
                ))
              ) : (
                <li className="no-flagged">No flagged transactions.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Fraud Detection System | Contact Us: support@fraud-detect.com</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
