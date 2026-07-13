package com.muratech.cctv.controller;

import com.muratech.cctv.entity.AuditLogEntity;
import com.muratech.cctv.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "*")
public class AuditLogController {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @GetMapping
    public List<AuditLogEntity> getAllLogs() {
        return auditLogRepository.findAll();
    }

    @PostMapping
    public AuditLogEntity createLog(@RequestBody AuditLogEntity log) {
        if (log.getId() == null || log.getId().trim().isEmpty()) {
            log.setId("log-" + UUID.randomUUID().toString().substring(0, 8));
        }
        return auditLogRepository.save(log);
    }

    @DeleteMapping
    public ResponseEntity<Void> clearAllLogs() {
        auditLogRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
}
