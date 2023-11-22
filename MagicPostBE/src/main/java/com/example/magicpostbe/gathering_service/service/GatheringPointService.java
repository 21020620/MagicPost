package com.example.magicpostbe.gathering_service.service;

import com.example.magicpostbe.gathering_service.entity.*;
import com.example.magicpostbe.gathering_service.repository.GPJPARepository;
import com.example.magicpostbe.gathering_service.repository.GPRepository;
import org.springframework.stereotype.Service;

@Service
public class GatheringPointService implements GPRepository {

    private GPJPARepository gpRepo;

    public GatheringPointService(GPJPARepository gpRepo) {
        this.gpRepo = gpRepo;
    }

    @Override
    public void createGatheringPoint(GatheringPoint gp) {
        gpRepo.save(gp);
    }

    public void addEmployeeToGatheringPoint(Long id, GatheringEmployee e) {
        GatheringPoint gp = gpRepo.findById(id).orElseThrow(() -> new CustomException("Gathering point not found"));
        gp.getEmployees().add(e);
        e.setGp(gp);
    }
}
