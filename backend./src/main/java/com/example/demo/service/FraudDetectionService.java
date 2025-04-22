package com.example.demo.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;

import java.util.List;
import java.util.Map;

@Service
public class FraudDetectionService {

    private final RestTemplate restTemplate;

    public FraudDetectionService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getPrediction(Map<String, Object> features) {
        String url = "http://127.0.0.1:5000/predict";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(features, headers);

        // Use ParameterizedTypeReference to handle the generic type correctly
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url, HttpMethod.POST, entity, new ParameterizedTypeReference<Map<String, Object>>() {});

        // Check if predictions are present in the response
        if (response.getBody() != null && response.getBody().containsKey("predictions")) {
            // Safe cast to List<Integer>
            Object predictionsObj = response.getBody().get("predictions");

            if (predictionsObj instanceof List<?>) {
                List<?> predictions = (List<?>) predictionsObj;
                // Check that the list contains Integer elements
                if (!predictions.isEmpty() && predictions.get(0) instanceof Integer) {
                    return predictions.get(0).toString();  // Return the prediction as a string
                }
            }
        }

        return "Error: Prediction not available";
    }
}
