package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "gallery_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryItemEntity {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 20)
    private String type; // 'image' | 'video'

    @Column(columnDefinition = "TEXT", nullable = false)
    private String url;

    @Column(nullable = false)
    private String caption;

    @Column(nullable = false, length = 50)
    private String category; // 'enterprise' | 'installation' | 'products' | 'team'
}
