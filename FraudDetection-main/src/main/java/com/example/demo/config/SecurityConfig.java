package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import javax.crypto.SecretKey;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Password encoder bean for BCrypt hashing
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Authentication manager for authenticating users
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // Security filter chain to configure HTTP security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for simplicity (can be enabled for production)
            .authorizeRequests(auth -> auth
                .requestMatchers("/auth/register", "/auth/login").permitAll()  // Allow unauthenticated access to login and registration
                .anyRequest().authenticated()  // Require authentication for all other requests
            )
            .oauth2ResourceServer()
                .jwt()  // Enable JWT support for resource server
                .jwtAuthenticationConverter(jwtAuthenticationConverter());  // Convert JWT to Spring Security authentication

        return http.build();
    }

    // JWT Authentication converter to extract claims and authorities from JWT
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        // Customize JWT to Spring Security conversion if necessary
        return converter;
    }

    // Define the JwtDecoder bean to decode the JWT token
    @Bean
    public JwtDecoder jwtDecoder() {
        String secretKey = "mySecretKey";  // Replace with your actual secret key

        // Convert string secret key into a SecretKey object
        SecretKey secret = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HMACSHA512");

        // Use NimbusJwtDecoder with SecretKey
        return NimbusJwtDecoder.withSecretKey(secret).build();
    }

    // CORS configuration for React front-end communication
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Allow requests from React (default port)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // Allow credentials like cookies
            }
        };
    }
}
