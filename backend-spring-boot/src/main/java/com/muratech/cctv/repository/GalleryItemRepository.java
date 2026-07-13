package com.muratech.cctv.repository;

import com.muratech.cctv.entity.GalleryItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryItemRepository extends JpaRepository<GalleryItemEntity, String> {
}
