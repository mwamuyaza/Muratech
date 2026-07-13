package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "service_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceItemEntity {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "icon_name", nullable = false, length = 100)
    private String iconName;

    @Convert(converter = ProductEntity.StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> features;

    @Column(name = "base_price", nullable = false, precision = 12, scale = 2)
    private BigDecimal basePrice;
}
