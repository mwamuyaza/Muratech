package com.muratech.cctv.controller;

import com.muratech.cctv.entity.ProductEntity;
import com.muratech.cctv.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProductById(@PathVariable String id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProductEntity addProduct(@RequestBody ProductEntity product) {
        if (product.getId() == null || product.getId().trim().isEmpty()) {
            product.setId("p-" + UUID.randomUUID().toString().substring(0, 8));
        }
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductEntity> updateProduct(@PathVariable String id, @RequestBody ProductEntity productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setDescription(productDetails.getDescription());
                    product.setPrice(productDetails.getPrice());
                    product.setCategory(productDetails.getCategory());
                    product.setImage(productDetails.getImage());
                    product.setStock(productDetails.getStock());
                    product.setFeatures(productDetails.getFeatures());
                    product.setResolution(productDetails.getResolution());
                    product.setIsWireless(productDetails.getIsWireless());
                    product.setRating(productDetails.getRating());
                    product.setModelNumber(productDetails.getModelNumber());
                    ProductEntity updated = productRepository.save(product);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
