package com.example.magicpostbe.gathering_service.repository;

import com.example.magicpostbe.gathering_service.entity.GatheringPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GPJPARepository extends JpaRepository<GatheringPoint, Long> {
}
