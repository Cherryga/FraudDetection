from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS import
import joblib
import xgboost as xgb
import math
from datetime import datetime
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for React (localhost:3000)
CORS(app, origins=["http://localhost:3000"])

# Load models
rf_model = joblib.load("rf_model.pkl")
xgb_model = xgb.Booster()
xgb_model.load_model('xgb_model.json')

# Check if the transaction time includes seconds
def parse_datetime(datetime_str):
    try:
        return datetime.strptime(datetime_str, "%Y-%m-%dT%H:%M:%S")  # Format with seconds
    except ValueError:
        return datetime.strptime(datetime_str, "%Y-%m-%dT%H:%M")  # Format without seconds

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get raw JSON data
        data = request.get_json(force=True)

        # Check if all required fields are present
        if not all(field in data for field in ['transaction_amount', 'transaction_time', 'previous_transaction_amount', 'previous_transaction_time']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Extract and process data
        transaction_amount = float(data['transaction_amount'])  # Convert to float
        transaction_time_str = data['transaction_time']
        previous_transaction_amount = float(data['previous_transaction_amount'])  # Convert to float
        previous_transaction_time_str = data['previous_transaction_time']  # Extracted here

        # Feature engineering
        TransactionAmt = transaction_amount
        TransactionAmt_Log = math.log(transaction_amount + 1)
        
        # Parse datetime
        transaction_time = parse_datetime(transaction_time_str)
        previous_transaction_time = parse_datetime(previous_transaction_time_str)

        Hour = transaction_time.hour
        Day = transaction_time.day
        amt_ratio = transaction_amount / previous_transaction_amount if previous_transaction_amount != 0 else 1
        txn_time_diff = (transaction_time - previous_transaction_time).total_seconds()

        # Final feature vector
        features = pd.DataFrame([{
            'TransactionAmt': TransactionAmt,
            'TransactionAmt_Log': TransactionAmt_Log,
            'Hour': Hour,
            'Day': Day,
            'amt_ratio': amt_ratio,
            'txn_time_diff': txn_time_diff
        }])

        # XGBoost prediction
        dmatrix_features = xgb.DMatrix(features)
        rf_pred = rf_model.predict(features)[0]
        xgb_pred = xgb_model.predict(dmatrix_features)[0]
        
        # Combine predictions (simple average)
        final_score = (rf_pred + xgb_pred) / 2

        # Prediction threshold
        final_prediction = 1 if final_score > 0.5 else 0

        return jsonify({'prediction': int(final_prediction)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
