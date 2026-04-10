
from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model (make sure the model path is correct)
model = joblib.load('fraud_detection_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Check if the incoming request is in JSON format
    if not request.is_json:
        return jsonify({"error": "Request must be in JSON format"}), 400

    # Get the input data from the request
    data = request.get_json()  # Parse JSON data from request

    # Check if data is empty
    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        # Convert the input data into a DataFrame for the model to process
        df = pd.DataFrame([data])  # Wrap the data in a list to make it a DataFrame row

        # Make prediction using the model
        prediction = model.predict(df)  # Assuming the model expects a 2D array (DataFrame)

        # Return the prediction result
        return jsonify({'predictions': prediction.tolist()})

    except Exception as e:
        # If there's an error in prediction, return the error message
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Ensure the app runs on host 0.0.0.0 to be accessible externally (if needed)
    app.run(debug=True, host='0.0.0.0')
