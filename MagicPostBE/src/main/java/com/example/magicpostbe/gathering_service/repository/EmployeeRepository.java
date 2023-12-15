package com.example.magicpostbe.gathering_service.repository;

import com.example.magicpostbe.gathering_service.entity.GatheringEmployee;

public interface EmployeeRepository {
    void addEmployee(GatheringEmployee e);

    GatheringEmployee getEmployeeById(Long id);

    GatheringEmployee[] getAllEmployees();

    void deleteEmployeeById(Long id);
}
