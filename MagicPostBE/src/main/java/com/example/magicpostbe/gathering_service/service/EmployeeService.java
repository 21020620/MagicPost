package com.example.magicpostbe.gathering_service.service;

import com.example.magicpostbe.gathering_service.entity.GatheringEmployee;
import com.example.magicpostbe.gathering_service.repository.EmployeeJPARepository;
import com.example.magicpostbe.gathering_service.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements EmployeeRepository {
    private EmployeeJPARepository ep;

    public EmployeeService(EmployeeJPARepository ep) {
        this.ep = ep;
    }


    @Override
    public void addEmployee(GatheringEmployee e) {
        ep.save(e);
    }
}
