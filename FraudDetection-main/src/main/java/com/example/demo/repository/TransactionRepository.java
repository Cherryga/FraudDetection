package com.example.demo.repository;

import com.example.demo.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    List<Transaction> findByUserId(UUID userId); // Use UUID for userId

    int countByUserId(UUID userId); // Use UUID for userId

    int countByUserIdAndFlaggedTrue(UUID userId); // Use UUID for userId

    @Query("SELECT MONTH(t.date) AS month, SUM(t.amount) AS total " +
            "FROM Transaction t WHERE t.user.id = :userId GROUP BY MONTH(t.date)")
    List<Object[]> getMonthlySpendingTrends(@Param("userId") UUID userId); // Consistent use of UUID
}
