package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "faqs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaqEntity {

    @Id
    @Column(length = 50)
    private String id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answer;

    @Column(nullable = false, length = 50)
    private String category; // 'technical' | 'billing' | 'installation' | 'general'
}
