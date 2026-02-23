//package com.example.demo.controller;
//
//import com.example.demo.model.User;
//import com.example.demo.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//
//    // Registration Endpoint
//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody User user) {
//        try {
//            userService.registerUser(user);
//            return ResponseEntity.ok("User registered successfully");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
//        }
//    }
//
//    // Login Endpoint
//    @PostMapping("/login")
//    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
//        return userService.authenticate(username, password)
//                .map(user -> ResponseEntity.ok("User authenticated successfully"))
//                .orElse(ResponseEntity.status(401).body("Invalid username or password"));
//    }
//}

package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            userService.registerUser(user);
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody Map<String, String> loginDetails) {
        String username = loginDetails.get("username");
        String password = loginDetails.get("password");

        return userService.authenticate(username, password)
                .map(user -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "User authenticated successfully");
                    response.put("username", user.getUsername());
                    // Token generation can be added here (e.g., JWT)
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("error", "Invalid username or password");
                    return ResponseEntity.status(401).body(response);
                });
    }
}

