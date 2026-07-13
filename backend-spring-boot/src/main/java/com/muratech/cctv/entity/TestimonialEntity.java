package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "testimonials")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialEntity {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false)
    private String author;

    private String company;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    @Column(nullable = false)
    private Integer rating = 5;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String avatar;
}
