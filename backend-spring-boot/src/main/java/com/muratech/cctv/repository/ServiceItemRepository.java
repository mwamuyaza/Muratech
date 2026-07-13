package com.muratech.cctv.repository;

import com.muratech.cctv.entity.ServiceItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceItemRepository extends JpaRepository<ServiceItemEntity, String> {
}
