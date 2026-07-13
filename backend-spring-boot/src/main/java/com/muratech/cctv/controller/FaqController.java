package com.muratech.cctv.controller;

import com.muratech.cctv.entity.FaqEntity;
import com.muratech.cctv.repository.FaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/faqs")
@CrossOrigin(origins = "*")
public class FaqController {

    @Autowired
    private FaqRepository faqRepository;

    @GetMapping
    public List<FaqEntity> getAllFaqs() {
        return faqRepository.findAll();
    }

    @PostMapping
    public FaqEntity addFaq(@RequestBody FaqEntity faq) {
        if (faq.getId() == null || faq.getId().trim().isEmpty()) {
            faq.setId("faq-" + UUID.randomUUID().toString().substring(0, 8));
        }
        return faqRepository.save(faq);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FaqEntity> updateFaq(@PathVariable String id, @RequestBody FaqEntity faqDetails) {
        return faqRepository.findById(id)
                .map(faq -> {
                    faq.setQuestion(faqDetails.getQuestion());
                    faq.setAnswer(faqDetails.getAnswer());
                    faq.setCategory(faqDetails.getCategory());
                    FaqEntity updated = faqRepository.save(faq);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable String id) {
        if (faqRepository.existsById(id)) {
            faqRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
