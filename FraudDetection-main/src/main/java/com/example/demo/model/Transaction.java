package com.example.demo.model;

//public class Transaction {
//}


import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Use AUTO for UUIDs
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Date date;

    private double amount;

    private boolean flagged;

    // Getters and Setters
    public UUID getId() {  // Change the return type to UUID
        return id;
    }

    public void setId(UUID id) {  // Change the parameter type to UUID
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public boolean isFlagged() {
        return flagged;
    }

    public void setFlagged(boolean flagged) {
        this.flagged = flagged;
    }
}
