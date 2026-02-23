// import React, { useState, useEffect } from "react";

// const transactions = [
//   { id: 1, text: "Transfer $500 to John", isFraud: false },
//   { id: 2, text: "Withdraw $3000 from Nigeria", isFraud: true },
//   { id: 3, text: "Login from Canada", isFraud: false },
//   { id: 4, text: "Multiple logins from unknown IP", isFraud: true },
//   { id: 5, text: "Purchase: $20 Starbucks", isFraud: false },
//   { id: 6, text: "Fake email link clicked", isFraud: true },
//   { id: 7, text: "VPN used during login", isFraud: true },
//   { id: 8, text: "ATM withdrawal in different city", isFraud: true },
// ];

// export default function FraudGame() {
//   const [score, setScore] = useState(0);
//   const [highScore, setHighScore] = useState(0);
//   const [currentTxn, setCurrentTxn] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [gameOver, setGameOver] = useState(false);

//   useEffect(() => {
//     const storedHigh = localStorage.getItem("highScore");
//     if (storedHigh) setHighScore(parseInt(storedHigh));
//   }, []);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       setGameOver(true);
//       if (score > highScore) {
//         setHighScore(score);
//         localStorage.setItem("highScore", score);
//       }
//       return;
//     }

//     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, score, highScore]);

//   useEffect(() => {
//     if (!gameOver) {
//       const interval = setInterval(() => {
//         const randomTxn =
//           transactions[Math.floor(Math.random() * transactions.length)];
//         setCurrentTxn(randomTxn);
//       }, 2000);
//       return () => clearInterval(interval);
//     }
//   }, [gameOver]);

//   const handleClick = (isFraudClicked) => {
//     if (!currentTxn || gameOver) return;
//     if (currentTxn.isFraud === isFraudClicked) {
//       setScore((prev) => prev + 1);
//     } else {
//       setScore((prev) => Math.max(0, prev - 1));
//     }
//     setCurrentTxn(null);
//   };

//   const restartGame = () => {
//     setScore(0);
//     setTimeLeft(30);
//     setGameOver(false);
//     setCurrentTxn(null);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 space-y-4 bg-gray-100 rounded-xl shadow-xl max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold">🚨 Catch the Fraudster!</h1>
//       <p className="text-lg">
//         Score: <span className="font-mono">{score}</span> /{" "}
//         High Score: <span className="font-mono text-green-600">{highScore}</span>
//       </p>
//       <p className="text-red-600 text-xl">⏱️ Time Left: {timeLeft}s</p>

//       <div className="bg-white p-4 rounded shadow w-full text-center min-h-[80px]">
//         {gameOver ? (
//           <p className="text-xl font-bold text-red-500">⏹️ Game Over!</p>
//         ) : currentTxn ? (
//           <p className="text-xl">{currentTxn.text}</p>
//         ) : (
//           <p className="text-gray-400">Waiting for transaction...</p>
//         )}
//       </div>

//       <div className="flex space-x-4">
//         <button
//           disabled={gameOver}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
//           onClick={() => handleClick(false)}
//         >
//           ✅ Legit
//         </button>
//         <button
//           disabled={gameOver}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
//           onClick={() => handleClick(true)}
//         >
//           ❌ Fraud
//         </button>
//       </div>

//       {gameOver && (
//         <button
//           onClick={restartGame}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           🔁 Play Again
//         </button>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";

// const FraudGame = () => {
//   const scenarios = [
//     {
//       question: "You get a call claiming your bank account is blocked. They ask for your OTP. What do you do?",
//       options: ["Give the OTP", "Ignore and report", "Call back later"],
//       correct: 1,
//     },
//     {
//       question: "An email says you won a lottery, asking for your card number to claim. What do you do?",
//       options: ["Send details", "Mark as spam", "Click the link"],
//       correct: 1,
//     },
//     {
//       question: "You see a transaction you didn’t make. What’s your first step?",
//       options: ["Ignore it", "Inform the bank", "Share on social media"],
//       correct: 1,
//     },
//     {
//       question: "You receive a message with a shortened link from an unknown number. What should you do?",
//       options: ["Click it quickly", "Open in private mode", "Don’t click, delete it"],
//       correct: 2,
//     },
//     {
//       question: "You’re shopping online and the site doesn’t have HTTPS. What's the risk?",
//       options: ["Nothing", "Data might be intercepted", "It's faster"],
//       correct: 1,
//     },
//     {
//       question: "A 'bank official' asks you to install a screen-sharing app. What do you do?",
//       options: ["Install it", "Install and uninstall later", "Refuse immediately"],
//       correct: 2,
//     },
//   ];

//   const [current, setCurrent] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);

//   const handleAnswer = (i) => {
//     if (i === scenarios[current].correct) {
//       setScore(score + 1);
//     }
//     if (current + 1 < scenarios.length) {
//       setCurrent(current + 1);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const restartGame = () => {
//     setCurrent(0);
//     setScore(0);
//     setShowResult(false);
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-2xl shadow-xl">
//       <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
//         🛡️ Fraud Awareness Game
//       </h2>

//       {!showResult ? (
//         <div>
//           <p className="text-lg font-medium text-gray-800 mb-4">
//             {scenarios[current].question}
//           </p>

//           <div className="space-y-3">
//             {scenarios[current].options.map((option, i) => (
//               <button
//                 key={i}
//                 onClick={() => handleAnswer(i)}
//                 className="w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium rounded-lg transition"
//               >
//                 {option}
//               </button>
//             ))}
//           </div>

//           <p className="text-sm text-right text-gray-500 mt-4">
//             Question {current + 1} of {scenarios.length}
//           </p>
//         </div>
//       ) : (
//         <div className="text-center">
//           <h3 className="text-xl font-semibold text-green-600 mb-4">
//             🎉 You scored {score} out of {scenarios.length}!
//           </h3>
//           <p className="text-gray-700 mb-4">
//             Stay alert and keep your information safe.
//           </p>
//           <button
//             onClick={restartGame}
//             className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             Play Again
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FraudGame;


import React, { useState } from "react";
import "./FraudGame.css";

const FraudGame = () => {
  const scenarios = [
    {
      question: "You get a call claiming your bank account is blocked. They ask for your OTP. What do you do?",
      options: ["Give the OTP", "Ignore and report", "Call back later"],
      correct: 1,
    },
    {
      question: "An email says you won a lottery, asking for your card number to claim. What do you do?",
      options: ["Send details", "Mark as spam", "Click the link"],
      correct: 1,
    },
    {
      question: "You see a transaction you didn’t make. What’s your first step?",
      options: ["Ignore it", "Inform the bank", "Share on social media"],
      correct: 1,
    },
    {
      question: "You receive a message with a shortened link from an unknown number. What should you do?",
      options: ["Click it quickly", "Open in private mode", "Don’t click, delete it"],
      correct: 2,
    },
    {
      question: "You’re shopping online and the site doesn’t have HTTPS. What's the risk?",
      options: ["Nothing", "Data might be intercepted", "It's faster"],
      correct: 1,
    },
    {
      question: "A 'bank official' asks you to install a screen-sharing app. What do you do?",
      options: ["Install it", "Install and uninstall later", "Refuse immediately"],
      correct: 2,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (i) => {
    if (i === scenarios[current].correct) {
      setScore(score + 1);
    }
    if (current + 1 < scenarios.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="fraud-box">
      <h2 className="fraud-title">🛡️ Fraud Awareness Game</h2>

      {!showResult ? (
        <div>
          <p className="fraud-question">{scenarios[current].question}</p>
          <div className="fraud-options">
            {scenarios[current].options.map((option, i) => (
              <button key={i} className="fraud-button" onClick={() => handleAnswer(i)}>
                {option}
              </button>
            ))}
          </div>
          {/* <p className="fraud-footer">
            Question {current + 1} of {scenarios.length}
          </p> */}
        </div>
      ) : (
        <div className="fraud-result">
          <h3>🎉 You scored {score} out of {scenarios.length}!</h3>
          <p>Stay alert and keep your information safe.</p>
          <button className="fraud-restart" onClick={restartGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default FraudGame;
