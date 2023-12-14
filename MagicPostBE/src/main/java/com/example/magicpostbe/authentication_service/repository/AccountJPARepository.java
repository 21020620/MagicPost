package com.example.magicpostbe.authentication_service.repository;

import com.example.magicpostbe.authentication_service.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountJPARepository extends JpaRepository<Account, String> {
    Optional<Account> findByEmail(String email);
}
