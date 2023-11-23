package com.example.magicpostbe.admin_service.controller;

import com.example.magicpostbe.gathering_service.entity.GatheringEmployee;
import com.example.magicpostbe.gathering_service.repository.EmployeeRepository;
import com.example.magicpostbe.gathering_service.repository.GPRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/ceo")
public class CEOController {
    private EmployeeRepository ep;
    private GPRepository gp;

    public CEOController(EmployeeRepository ep, GPRepository gp) {
        this.ep = ep;
        this.gp = gp;
    }

    @GetMapping("/TestingHomePage")
    public ResponseEntity<?> testDeployment() {
        return ResponseEntity.ok("Update code successfully");
    }

    @PostMapping("/addEmployee")
    public ResponseEntity<?> addEmployee(@RequestBody GatheringEmployee e) {
        ep.addEmployee(e);
        return ResponseEntity.ok(e);
    }

    @PutMapping("/updategp/{id}")
    public ResponseEntity<?> updateGP(@PathVariable Long id, @RequestBody GatheringEmployee e) {
        gp.addEmployeeToGatheringPoint(id, e);
        return ResponseEntity.ok("Employee added to gathering point");
    }
}
