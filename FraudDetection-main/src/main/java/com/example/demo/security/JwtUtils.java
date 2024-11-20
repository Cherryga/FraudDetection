package com.example.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.demo.model.User;

import java.util.Date;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")  // Inject secret from application properties
    private String secret;

    @Value("${jwt.expiration}")  // Inject expiration time from application properties
    private long expiration;

    // Method to generate JWT token
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())  // Use the username from the User object
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)  // Use HS512 algorithm and the secret
                .compact();
    }

    // Method to validate JWT token (you can add more validations as needed)
    public boolean validateToken(String token, String username) {
        String tokenUsername = getUsernameFromToken(token);
        return (username.equals(tokenUsername) && !isTokenExpired(token));
    }

    // Extract username from token
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }
}
