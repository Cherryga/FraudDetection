package com.example.demo.dto;

import java.util.Map;

public class TransactionSummaryDTO {
    private long totalTransactions;
    private long totalFlaggedTransactions;
    private Map<String, Double> monthlySpendingTrends;

    // Constructors
    public TransactionSummaryDTO() {}

    public TransactionSummaryDTO(long totalTransactions, long totalFlaggedTransactions, Map<String, Double> monthlySpendingTrends) {
        this.totalTransactions = totalTransactions;
        this.totalFlaggedTransactions = totalFlaggedTransactions;
        this.monthlySpendingTrends = monthlySpendingTrends;
    }

    // Getters and Setters
    public long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public long getTotalFlaggedTransactions() {
        return totalFlaggedTransactions;
    }

    public void setTotalFlaggedTransactions(long totalFlaggedTransactions) {
        this.totalFlaggedTransactions = totalFlaggedTransactions;
    }

    public Map<String, Double> getMonthlySpendingTrends() {
        return monthlySpendingTrends;
    }

    public void setMonthlySpendingTrends(Map<String, Double> monthlySpendingTrends) {
        this.monthlySpendingTrends = monthlySpendingTrends;
    }
}
