package com.example.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import com.example.demo.model.User;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private final JwtProperties jwtProperties;

    // Constructor to inject JwtProperties
    public JwtUtils(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    // Method to generate JWT token
    public String generateToken(User user) {
        // Generate the signing key using the secret from JwtProperties
        Key key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());

        return Jwts.builder()
                .setSubject(user.getUsername())  // Use the username from the User object
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpiration()))
                .signWith(key, SignatureAlgorithm.HS512)  // Use HS512 algorithm with the signing key
                .compact();
    }

    // Method to validate JWT token
    public boolean validateToken(String token, String username) {
        String tokenUsername = getUsernameFromToken(token);
        return (username.equals(tokenUsername) && !isTokenExpired(token));
    }

    // Extract username from token
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()  // Use parserBuilder() for updated API
                .setSigningKey(Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes()))  // Get secret from JwtProperties
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parserBuilder()  // Use parserBuilder() for updated API
                .setSigningKey(Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes()))  // Get secret from JwtProperties
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }
}
