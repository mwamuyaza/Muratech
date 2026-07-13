package com.muratech.cctv.repository;

import com.muratech.cctv.entity.AdminCredentialEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminCredentialRepository extends JpaRepository<AdminCredentialEntity, String> {
    Optional<AdminCredentialEntity> findByUsername(String username);
}
