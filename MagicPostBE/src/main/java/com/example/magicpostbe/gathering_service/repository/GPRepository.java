package com.example.magicpostbe.gathering_service.repository;

import com.example.magicpostbe.gathering_service.entity.GatheringEmployee;
import com.example.magicpostbe.gathering_service.entity.GatheringPoint;

public interface GPRepository {
    void createGatheringPoint(GatheringPoint gp);
    void addEmployeeToGatheringPoint(Long id, GatheringEmployee e);
}
