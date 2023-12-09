package com.example.magicpostbe.authentication_service.repository;

import com.example.magicpostbe.authentication_service.entity.RefreshToken;
import com.example.magicpostbe.authentication_service.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByAccount(Account account);
}
