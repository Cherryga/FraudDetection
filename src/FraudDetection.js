import React, { useState } from 'react';

function FraudDetection() {
    const [transaction, setTransaction] = useState({
        Time: "",
        V1: "",
        V2: "",
        V3: "",
        Amount: ""
    });
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/api/fraud/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),  // Send the transaction data as JSON
        });

        const data = await response.json();  // Parse the response JSON
        if (data.prediction) {
            setResult(`Fraud Prediction: ${data.prediction}`);
        } else {
            setResult('Error predicting fraud.');
        }
    };

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Fraud Detection</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Time"
                    value={transaction.Time}
                    onChange={handleChange}
                    placeholder="Time"
                    required
                />
                <input
                    type="text"
                    name="V1"
                    value={transaction.V1}
                    onChange={handleChange}
                    placeholder="V1"
                    required
                />
                <input
                    type="text"
                    name="V2"
                    value={transaction.V2}
                    onChange={handleChange}
                    placeholder="V2"
                    required
                />
                <input
                    type="text"
                    name="V3"
                    value={transaction.V3}
                    onChange={handleChange}
                    placeholder="V3"
                    required
                />
                <input
                    type="text"
                    name="Amount"
                    value={transaction.Amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Analyze Transaction</button>
            </form>
            {result && <p>{result}</p>}
        </div>
    );
}

export default FraudDetection;
