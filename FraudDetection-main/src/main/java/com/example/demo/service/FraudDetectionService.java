package com.example.demo.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        // Get prediction from the response
        if (response.getBody() != null && response.getBody().containsKey("predictions")) {
            List<Integer> predictions = (List<Integer>) response.getBody().get("predictions");
            return predictions.get(0).toString();  // Return the prediction as a string
        }

        return "Error: Prediction not available";
    }
}
