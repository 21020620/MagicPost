package com.example.magicpostbe.admin_service.repository;

import com.example.magicpostbe.admin_service.entity.CEO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CEOJPARepository extends JpaRepository<CEO, String> {
}
