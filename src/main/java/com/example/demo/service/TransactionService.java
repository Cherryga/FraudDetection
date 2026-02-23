//package com.example.demo.service;
//
//import com.example.demo.model.Transaction;
//import com.example.demo.model.User;
//import com.example.demo.repository.TransactionRepository;
//import com.example.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//import java.util.UUID;
//
//@Service
//public class TransactionService {
//
//    @Autowired
//    private TransactionRepository transactionRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public void createSampleTransactions() {
//        // Replace "your-uuid-string" with a valid UUID string of an existing user
//        UUID userId = UUID.fromString("your-uuid-string");
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Transaction t1 = new Transaction();
//        t1.setUser(user);
//        t1.setDate(new Date());
//        t1.setAmount(1200.00);
//        t1.setFlagged(false);
//
//        Transaction t2 = new Transaction();
//        t2.setUser(user);
//        t2.setDate(new Date());
//        t2.setAmount(5000.00);
//        t2.setFlagged(true);
//
//        transactionRepository.save(t1);
//        transactionRepository.save(t2);
//    }
//}

package com.example.demo.service;

import com.example.demo.dto.TransactionSummaryDTO;
import com.example.demo.model.Transaction;
import com.example.demo.model.User;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    // Create sample transactions
    public void createSampleTransactions() {
        UUID userId = UUID.fromString("your-uuid-string");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction t1 = new Transaction();
        t1.setUser(user);
        t1.setDate(new Date());
        t1.setAmount(1200.00);
        t1.setFlagged(false);

        Transaction t2 = new Transaction();
        t2.setUser(user);
        t2.setDate(new Date());
        t2.setAmount(5000.00);
        t2.setFlagged(true);

        transactionRepository.save(t1);
        transactionRepository.save(t2);
    }

    // Fetch transaction summary
    public TransactionSummaryDTO getTransactionSummary(UUID userId) {
        long totalTransactions = transactionRepository.countByUserId(userId);
        long totalFlaggedTransactions = transactionRepository.countByUserIdAndFlaggedTrue(userId);

        List<Object[]> monthlySpending = transactionRepository.getMonthlySpendingTrends(userId);

        Map<String, Double> monthlySpendingTrends = monthlySpending.stream()
                .collect(Collectors.toMap(
                        data -> "Month " + data[0], // Format month as "Month X"
                        data -> (Double) data[1]
                ));

        return new TransactionSummaryDTO(totalTransactions, totalFlaggedTransactions, monthlySpendingTrends);
    }

    // Fetch recent activity
    public List<Transaction> getRecentActivity(UUID userId) {
        return transactionRepository.findByUserId(userId)
                .stream()
                .sorted((t1, t2) -> t2.getDate().compareTo(t1.getDate())) // Sort by date descending
                .limit(10)
                .collect(Collectors.toList());
    }

    public void saveTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

}