package com.example.magicpostbe.gathering_service.service;

import com.example.magicpostbe.gathering_service.entity.GatheringEmployee;
import com.example.magicpostbe.gathering_service.repository.EmployeeJPARepository;
import com.example.magicpostbe.gathering_service.repository.EmployeeRepository;
import com.example.magicpostbe.system_service.exception.CustomerException;
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

    @Override
    public GatheringEmployee getEmployeeById(Long id) {
        return ep.findById(id).orElseThrow(() -> new CustomerException("Employee not found"));
    }

    @Override
    public GatheringEmployee[] getAllEmployees() {
        return ep.findAll().toArray(GatheringEmployee[]::new);
    }

    @Override
    public void deleteEmployeeById(Long id) {
        ep.findById(id).orElseThrow(() -> new CustomerException("Employee not found"));
        ep.deleteById(id);
    }
}
