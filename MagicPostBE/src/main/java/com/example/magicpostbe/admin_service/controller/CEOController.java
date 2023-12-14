package com.example.magicpostbe.admin_service.controller;

import com.example.magicpostbe.gathering_service.entity.GatheringEmployee;
import com.example.magicpostbe.gathering_service.repository.EmployeeRepository;
import com.example.magicpostbe.gathering_service.repository.GPRepository;
import com.github.javafaker.Faker;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getEmployee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        System.out.println("Get employee by id: " + id);
        GatheringEmployee e = ep.getEmployeeById(id);
        return ResponseEntity.ok(e);
    }

    @PostMapping("/addEmployee")
    public ResponseEntity<?> addEmployee(@RequestBody GatheringEmployee e) {
        ep.addEmployee(e);
        return ResponseEntity.ok("Employee added\n" + e + "\n");
    }

    @PostMapping("/generateFakeData")
    public ResponseEntity<?> generateFakeData() {
        for(int i = 0; i < 10; i++) {
            Faker faker = new Faker();
            GatheringEmployee e = new GatheringEmployee();
            e.setFirstName(faker.name().firstName());
            e.setLastName(faker.name().lastName());
            e.setAddress(faker.address().streetAddress());
            e.setPhoneNumber(faker.phoneNumber().subscriberNumber(10));
            e.setEmail(e.getFirstName() + "@gmail.com");

            ep.addEmployee(e);
        }
        return ResponseEntity.ok("Generate successful");
    }

    @PutMapping("/updategp/{id}")
    public ResponseEntity<?> updateGP(@PathVariable Long id, @RequestBody GatheringEmployee e) {
        gp.addEmployeeToGatheringPoint(id, e);
        return ResponseEntity.ok("Employee added to gathering point");
    }
}
