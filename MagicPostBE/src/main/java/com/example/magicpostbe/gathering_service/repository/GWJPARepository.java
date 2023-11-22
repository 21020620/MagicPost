package com.example.magicpostbe.gathering_service.repository;

import com.example.magicpostbe.gathering_service.entity.GatheringWorker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GWJPARepository extends JpaRepository<GatheringWorker, Long> {
}
