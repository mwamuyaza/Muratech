package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "seo_settings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeoSettingsEntity {

    @Id
    @Column(length = 50)
    private String id; // usually "default"

    @Column(name = "meta_title", nullable = false)
    private String metaTitle;

    @Column(name = "meta_description", columnDefinition = "TEXT", nullable = false)
    private String metaDescription;

    @Convert(converter = ProductEntity.StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> keywords;

    @Column(name = "canonical_url", nullable = false)
    private String canonicalUrl;
}
