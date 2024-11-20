package com.example.demo.controller;

import com.example.demo.service.FraudDetectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/fraud")
public class FraudController {

    private final FraudDetectionService fraudDetectionService;

    public FraudController(FraudDetectionService fraudDetectionService) {
        this.fraudDetectionService = fraudDetectionService;
    }

    @PostMapping("/predict")
    public ResponseEntity<Map<String, String>> predictFraud(@RequestBody Map<String, Object> requestData) {
        // Get prediction from the service
        String prediction = fraudDetectionService.getPrediction(requestData);

        // Return the prediction in the response
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("prediction", prediction);

        return ResponseEntity.ok(responseBody);
    }
}
