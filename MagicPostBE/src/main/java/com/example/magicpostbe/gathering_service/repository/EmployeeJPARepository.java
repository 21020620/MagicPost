package com.example.magicpostbe.gathering_service.repository;

import com.example.magicpostbe.gathering_service.entity.GatheringEmployee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeJPARepository extends JpaRepository<GatheringEmployee, Long> {
}
