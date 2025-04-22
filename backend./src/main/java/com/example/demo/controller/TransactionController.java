package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String FLASK_API_URL = "http://localhost:5000/predict";  // Flask API URL

    @PostMapping("/predict-fraud")
    public ResponseEntity<String> predictFraud(@RequestBody Map<String, Object> transactionData) {
        try {
            // Send POST request to Flask API with transaction data
            ResponseEntity<String> response = restTemplate.postForEntity(FLASK_API_URL, transactionData, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
