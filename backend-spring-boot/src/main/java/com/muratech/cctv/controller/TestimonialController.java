package com.muratech.cctv.controller;

import com.muratech.cctv.entity.TestimonialEntity;
import com.muratech.cctv.repository.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/testimonials")
@CrossOrigin(origins = "*")
public class TestimonialController {

    @Autowired
    private TestimonialRepository testimonialRepository;

    @GetMapping
    public List<TestimonialEntity> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    @PostMapping
    public TestimonialEntity addTestimonial(@RequestBody TestimonialEntity testimonial) {
        if (testimonial.getId() == null || testimonial.getId().trim().isEmpty()) {
            testimonial.setId("test-" + UUID.randomUUID().toString().substring(0, 8));
        }
        return testimonialRepository.save(testimonial);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonialEntity> updateTestimonial(@PathVariable String id, @RequestBody TestimonialEntity details) {
        return testimonialRepository.findById(id)
                .map(testimonial -> {
                    testimonial.setAuthor(details.getAuthor());
                    testimonial.setCompany(details.getCompany());
                    testimonial.setText(details.getText());
                    testimonial.setRating(details.getRating());
                    testimonial.setAvatar(details.getAvatar());
                    TestimonialEntity updated = testimonialRepository.save(testimonial);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable String id) {
        if (testimonialRepository.existsById(id)) {
            testimonialRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
