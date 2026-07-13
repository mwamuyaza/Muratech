package com.muratech.cctv.repository;

import com.muratech.cctv.entity.SeoSettingsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeoSettingsRepository extends JpaRepository<SeoSettingsEntity, String> {
}
