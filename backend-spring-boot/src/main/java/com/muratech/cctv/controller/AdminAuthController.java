package com.muratech.cctv.controller;

import com.muratech.cctv.entity.AdminCredentialEntity;
import com.muratech.cctv.repository.AdminCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AdminAuthController {

    @Autowired
    private AdminCredentialRepository adminCredentialRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.getOrDefault("username", "admin");
        String password = credentials.get("password");

        if (password == null || password.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Password is required");
            return ResponseEntity.badRequest().body(error);
        }

        return adminCredentialRepository.findByUsername(username)
                .map(cred -> {
                    if (cred.getPasswordHash().equals(password)) { // In production, use BCrypt encoder matches
                        Map<String, Object> response = new HashMap<>();
                        response.put("success", true);
                        response.put("token", "JWT-SESSION-MT-CCTV-" + System.currentTimeMillis());
                        response.put("username", cred.getUsername());
                        return ResponseEntity.ok(response);
                    } else {
                        Map<String, String> error = new HashMap<>();
                        error.put("error", "Incorrect administration token password");
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
                    }
                })
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Admin user not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                });
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String username = request.getOrDefault("username", "admin");
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");

        if (newPassword == null || newPassword.length() < 4) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "New password must be at least 4 characters long");
            return ResponseEntity.badRequest().body(error);
        }

        return adminCredentialRepository.findByUsername(username)
                .map(cred -> {
                    // Verification
                    if (oldPassword != null && !cred.getPasswordHash().equals(oldPassword)) {
                        Map<String, String> error = new HashMap<>();
                        error.put("error", "Current password does not match");
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
                    }
                    
                    cred.setPasswordHash(newPassword);
                    cred.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                    adminCredentialRepository.save(cred);

                    Map<String, String> success = new HashMap<>();
                    success.put("message", "Password successfully changed in MySQL");
                    return ResponseEntity.ok(success);
                })
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Admin account not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                });
    }
}
