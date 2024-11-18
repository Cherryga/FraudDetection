package com.example.demo.controller;

import com.example.demo.dto.TransactionSummaryDTO;
import com.example.demo.model.Transaction;
import com.example.demo.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/summary")
    public ResponseEntity<TransactionSummaryDTO> getTransactionSummary(@RequestParam UUID userId) {
        TransactionSummaryDTO summary = transactionService.getTransactionSummary(userId);
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<Transaction>> getRecentActivity(@RequestParam UUID userId) {
        List<Transaction> recentTransactions = transactionService.getRecentActivity(userId);
        return ResponseEntity.ok(recentTransactions);
    }

    @PostMapping
    public ResponseEntity<String> addTransaction(@RequestBody Transaction transaction) {
        try {
            transactionService.saveTransaction(transaction);
            return ResponseEntity.ok("Transaction added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}



