package com.muratech.cctv.controller;

import com.muratech.cctv.entity.ContactInfoEntity;
import com.muratech.cctv.entity.SeoSettingsEntity;
import com.muratech.cctv.repository.ContactInfoRepository;
import com.muratech.cctv.repository.SeoSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    @Autowired
    private SeoSettingsRepository seoSettingsRepository;

    @GetMapping("/contact")
    public ResponseEntity<ContactInfoEntity> getContactInfo() {
        return contactInfoRepository.findById("default")
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/contact")
    public ResponseEntity<ContactInfoEntity> updateContactInfo(@RequestBody ContactInfoEntity info) {
        info.setId("default");
        ContactInfoEntity saved = contactInfoRepository.save(info);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/seo")
    public ResponseEntity<SeoSettingsEntity> getSeoSettings() {
        return seoSettingsRepository.findById("default")
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/seo")
    public ResponseEntity<SeoSettingsEntity> updateSeoSettings(@RequestBody SeoSettingsEntity seo) {
        seo.setId("default");
        SeoSettingsEntity saved = seoSettingsRepository.save(seo);
        return ResponseEntity.ok(saved);
    }
}
