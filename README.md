## VeriSafe – Hybrid AI Fraud Detection System

# Overview

VeriSafe is a hybrid fraud detection system designed to identify suspicious financial transactions using a combination of machine learning models and rule-based validation techniques. The system analyzes transactional data to detect anomalous patterns and classify transactions as fraudulent or legitimate.

The project demonstrates how predictive models can be integrated into a modular backend architecture to support real-time fraud detection workflows.

# Key Features

Hybrid fraud detection pipeline combining Machine Learning + Rule-Based Validation

Implementation of Random Forest and XGBoost classifiers

Feature engineering and anomaly detection on transaction datasets

Flask ML microservice for fraud prediction

Spring Boot backend for API communication

Modular architecture enabling scalable fraud detection systems

# System Architecture
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/1f4f24e4-327d-4d43-868a-9dfa666aea02" />

# Workflow

Transaction data is submitted through the frontend.

The backend processes the request and sends transaction data to the ML microservice.

The machine learning model analyzes the transaction features.

Fraud probability is calculated.

The result is returned to the backend and displayed to the user.

# Machine Learning Pipeline

Data Preprocessing

Handling missing values

Data normalization

Cleaning transaction records

Feature Engineering

Key behavioral features are extracted from transaction data to improve model performance.

Model Training

Two machine learning models are trained for fraud classification:

Random Forest

XGBoost

Model Evaluation

Models are evaluated using:

Accuracy

Precision

Recall

F1 Score

The hybrid pipeline improved fraud detection performance by approximately 12% compared to baseline models.

# Technology Stack

Machine Learning

Python

Scikit-learn

Random Forest

XGBoost

Pandas

NumPy

Backend

Java

Spring Boot

REST APIs

ML Microservice

Flask

Frontend

React

JavaScript

Tools

Git

Postman

Linux

Dataset

The fraud detection models are trained using transactional datasets containing financial transaction records.

# Dataset Characteristics

Typical dataset features include:

Transaction amount

Transaction timestamp

Customer identifier

Merchant information

Transaction location

Fraud label (fraudulent / legitimate)

# Data Processing Steps

Removal of missing or corrupted records

Normalization of numerical features

Encoding categorical variables

Feature extraction for model training

These preprocessing steps help improve the accuracy and reliability of the fraud detection models.

## Setup Instructions
1. Clone the Repository
git clone https://github.com/Zamishi/FraudDetection.git
cd FraudDetection
2. Setup Machine Learning Service

Navigate to the ML service folder:

cd ml-service

Install dependencies:

pip install -r requirements.txt

Run the Flask prediction service:

python app.py
3. Run the Backend

Navigate to the backend folder and run the Spring Boot application.

Example:

mvn spring-boot:run

The backend will handle API requests and communicate with the ML service.

4. Run the Frontend

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend application:

npm start

# Potential improvements for the system include:

Graph-based fraud detection techniques

Explainable AI methods such as SHAP and LIME

Real-time fraud detection for streaming transaction data

Cloud deployment for scalable inference

# Research Contribution

This project forms the implementation base for the research paper:

Hybrid AI Approach for Fraud Detection: Integrating Rule-Based Systems with Machine Learning and Graph Analysis

Accepted at ICAICCIT 2025.
