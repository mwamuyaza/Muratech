package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "audit_logs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogEntity {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false, length = 50)
    private String type; // 'create' | 'update' | 'delete' | 'payment' | 'email' | 'system'

    @Column(nullable = false, length = 100)
    private String user;

    @Column(nullable = false, length = 50)
    private String timestamp;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String details;
}
