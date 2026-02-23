// import React, { useState, useEffect } from 'react';

// const FloatingFacts = () => {
//   const facts = [
//     "1 in 4 people fall victim to some form of cyber fraud annually.",
//     "Phishing emails account for 90% of cyberattacks on businesses.",
//     "Data breaches can cost companies up to $4.45 million on average.",
//     "The global cost of cybercrime is projected to hit $10.5 trillion annually by 2025.",
//     "Credit card fraud increased by 14% in the last year alone.",
//     "Cybersecurity breaches are a major cause of loss in the financial sector.",
//     "Ransomware attacks have surged by 150% in the past two years.",
//     "Weak passwords are responsible for 81% of data breaches."
//   ];

//   const [activeFact, setActiveFact] = useState(facts[0]);

//   useEffect(() => {
//     const factInterval = setInterval(() => {
//       setActiveFact(facts[Math.floor(Math.random() * facts.length)]);
//     }, 3000);

//     return () => clearInterval(factInterval); // Clear interval on component unmount
//   }, []);

//   return (
//     <div className="floating-facts">
//       <p>{activeFact}</p>
//     </div>
//   );
// };

// export default FloatingFacts;  // Make sure this line is here!


// import React, { useEffect, useState } from 'react';
// import './FloatingFacts.css';

// const facts = [
//   'Cybersecurity Fact: 1 in 4 people fall victim to some form of cyber fraud annually.',
//   'Fraud Fact: Over $5 billion was lost to credit card fraud in 2020 alone.',
//   'Phishing Fact: 90% of data breaches are caused by phishing emails.',
//   'Account Takeover Fact: The average cost of an account takeover is $20,000.',
//   'Card Skimming Fact: ATM card skimming affects over 1 million people worldwide every year.',
//   'Identity Theft Fact: Over 16 million Americans fall victim to identity theft annually.',
//   'Malware Fact: Malware attacks are responsible for 30% of cybercrime globally.',
//   'Ransomware Fact: Ransomware attacks have increased by 150% in the past year.'
// ];

// const FloatingFacts = () => {
//   const [currentFactIndex, setCurrentFactIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentFactIndex((prev) => (prev + 1) % facts.length);
//     }, 4000); // Change fact every 4 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="floating-fact-container">
//       <div className="fact-cloud">
//         <p>{facts[currentFactIndex]}</p>
//       </div>
//     </div>
//   );
// };

// export default FloatingFacts;
