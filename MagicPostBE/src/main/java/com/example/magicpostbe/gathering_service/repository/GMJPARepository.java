package com.example.magicpostbe.gathering_service.repository;

import com.example.magicpostbe.gathering_service.entity.GatheringManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GMJPARepository extends JpaRepository<GatheringManager, Long> {
}
