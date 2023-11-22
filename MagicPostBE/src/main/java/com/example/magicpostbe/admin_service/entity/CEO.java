package com.example.magicpostbe.admin_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "ceo")
public class CEO {
    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "First name cannot be blank")
    @Pattern(regexp = "^[a-zA-Z\\s'-]+$", message = "First name must contain only letters")
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @NotBlank(message = "Last name cannot be blank")
    @Pattern(regexp = "^[a-zA-Z\\s'-]+$", message = "Last name must contain only letters")
    private String lastName;

    @Id
    @Column(name = "email", nullable = false, unique = true)
    @Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", message = "Email must be in the correct format")
    private String email;

    @Column(name = "age")
    @Min(value = 1, message = "Age must be greater than 0")
    private int age;

    @Column(name = "phone", unique = true)
    @Pattern(regexp = "^[0-9]+$", message = "Phone number must contain only numbers")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    public CEO(String firstName, String lastName, String email, int age, String phoneNumber, String address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    public CEO() {

    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
