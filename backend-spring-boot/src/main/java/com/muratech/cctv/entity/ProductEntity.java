package com.muratech.cctv.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 50)
    private String category; // 'dome' | 'bullet' | 'ptz' | 'nvr' | 'accessories' | 'package'

    @Column(columnDefinition = "TEXT")
    private String image;

    @Column(nullable = false)
    private Integer stock;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> features;

    @Column(nullable = false, length = 50)
    private String resolution;

    @Column(name = "is_wireless", nullable = false)
    private Boolean isWireless;

    @Column(nullable = false, precision = 3, scale = 2)
    private BigDecimal rating;

    @Column(name = "model_number", nullable = false, length = 100)
    private String modelNumber;

    // Converter to handle mapping List<String> to a comma-separated String in the database
    @Converter
    public static class StringListConverter implements AttributeConverter<List<String>, String> {
        @Override
        public String convertToDatabaseColumn(List<String> attribute) {
            if (attribute == null || attribute.isEmpty()) {
                return "";
            }
            return String.join(",", attribute);
        }

        @Override
        public List<String> convertToEntityAttribute(String dbData) {
            if (dbData == null || dbData.trim().isEmpty()) {
                return Arrays.asList();
            }
            return Arrays.stream(dbData.split(","))
                    .map(String::trim)
                    .collect(Collectors.toList());
        }
    }
}
