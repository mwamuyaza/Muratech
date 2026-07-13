package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "blog_posts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostEntity {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String summary;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false, length = 50)
    private String category; // 'security' | 'technology' | 'installation' | 'corporate'

    @Column(nullable = false, length = 100)
    private String author;

    @Column(nullable = false, length = 50)
    private String date;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String image;

    @Column(name = "is_news", nullable = false)
    private Boolean isNews = false;

    @Column(name = "is_event", nullable = false)
    private Boolean isEvent = false;

    @Column(name = "event_date", length = 50)
    private String eventDate;
}
