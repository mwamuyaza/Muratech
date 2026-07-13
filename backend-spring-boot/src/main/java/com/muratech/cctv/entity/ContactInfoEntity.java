package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "contact_info")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactInfoEntity {

    @Id
    @Column(length = 50)
    private String id; // usually "default"

    @Column(nullable = false, length = 50)
    private String phone;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String address;

    private String facebook;
    private String twitter;
    private String tiktok;
    private String instagram;
}
