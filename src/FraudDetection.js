import React, { useState } from 'react';
import './FraudDetection.css';

function FraudDetection() {
    const [transaction, setTransaction] = useState({
        Time: 100,  // Default time value
        V1: 0, V2: 0, V3: 0, V4: 0, V5: 0, V6: 0, V7: 0, V8: 0, V9: 0, V10: 0,
        V11: 0, V12: 0, V13: 0, V14: 0, V15: 0, V16: 0, V17: 0, V18: 0, V19: 0, V20: 0,
        V21: 0, V22: 0, V23: 0, V24: 0, V25: 0, V26: 0, V27: 0, V28: 0,
        Amount: 200  // Default Amount value
    });

    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction),
            });
            const data = await response.json();
            setResult(`Fraud Prediction: ${data.predictions[0]}`);
        } catch (error) {
            setResult('Error communicating with the backend.');
        }
    };

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="fraud-detection">
            <h1>Fraud Detection</h1>
            <form onSubmit={handleSubmit} className="transaction-form">
                {Object.keys(transaction).map((key, index) => (
                    key !== 'predictions' && (
                        <input
                            key={index}
                            type="number"
                            name={key}
                            value={transaction[key]}
                            onChange={handleChange}
                            placeholder={key}
                            required={key === 'Amount'}
                        />
                    )
                ))}
                <button type="submit" className="submit-btn">Analyze Transaction</button>
            </form>
            {result && <p className="result">{result}</p>}
        </div>
    );
}

export default FraudDetection;
