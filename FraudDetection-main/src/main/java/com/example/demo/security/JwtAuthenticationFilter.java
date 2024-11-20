package com.example.demo.security;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")  // Optional: For automatic filter registration with @WebFilter annotation
public abstract class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    // This method is required to override from OncePerRequestFilter
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Get the token from the Authorization header
        String token = getTokenFromRequest(request);

        if (token != null && !token.isEmpty()) {
            try {
                // Get username from token and validate
                String username = jwtUtils.getUsernameFromToken(token);
                if (username != null && jwtUtils.validateToken(token, username)) {
                    // Proceed if the token is valid, set authentication in the context
                    // Here, you can add custom authentication logic if needed
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                    return;
                }
            } catch (ExpiredJwtException e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Expired token");
                return;
            }
        }
        // Proceed with the next filter in the chain
        filterChain.doFilter(request, response);
    }

    // Helper method to extract the token from the "Authorization" header
    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);  // Remove the "Bearer " prefix
        }
        return null;
    }
}
