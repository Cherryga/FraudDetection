import React, { useState } from 'react';

function FraudDetection() {
    const [transaction, setTransaction] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8081/api/fraud/detect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });

        const data = await response.text();
        setResult(data);
    };

    return (
        <div>
            <h1>Fraud Detection</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={transaction}
                    onChange={(e) => setTransaction(e.target.value)}
                    placeholder="Enter transaction details"
                    required
                />
                <button type="submit">Analyze Transaction</button>
            </form>
            {result && <p>Result: {result}</p>}
        </div>
    );
}

export default FraudDetection;

