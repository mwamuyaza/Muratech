package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin_credentials")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminCredentialEntity {

    @Id
    @Column(length = 50)
    private String id; // usually "default"

    @Column(nullable = false, unique = true, length = 100)
    private String username; // defaults to "admin"

    @Column(name = "password_hash", nullable = false)
    private String passwordHash; // plain or encrypted password hash string

    @Column(name = "updated_at", nullable = false, length = 50)
    private String updatedAt;
}
