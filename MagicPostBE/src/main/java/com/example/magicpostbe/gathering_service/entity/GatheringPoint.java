package com.example.magicpostbe.gathering_service.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class GatheringPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "city", nullable = false)
    private String city;

    @OneToMany(mappedBy = "gp")
    private List<GatheringEmployee> gatheringEmployees = new ArrayList<>();

    public GatheringPoint() {
    }

    public GatheringPoint(Long id, String name, String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public List<GatheringEmployee> getEmployees() {
        return gatheringEmployees;
    }

    public void setEmployees(List<GatheringEmployee> gatheringEmployees) {
        this.gatheringEmployees = gatheringEmployees;
    }
}
