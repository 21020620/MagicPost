package com.example.magicpostbe.authentication_service.controller;

import com.example.magicpostbe.authentication_service.entity.Account;
import com.example.magicpostbe.authentication_service.repository.AccountRepository;
import com.example.magicpostbe.authentication_service.entity.*;
import com.example.magicpostbe.authentication_service.service.RefreshTokenService;
import com.example.magicpostbe.system_service.entity.ApplicationLogger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping()
public class AuthenticationController {
    private AuthenticationManager authenticationManager;
    private JwtProvider jwtProvider;
    private AccountRepository accountService;
    private RefreshTokenService refreshTokenService;

    private static final Logger logger = ApplicationLogger.getLogger();

    public AuthenticationController(AuthenticationManager authenticationManager, JwtProvider jwtProvider, AccountRepository accountService, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
        this.accountService = accountService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/login")
    public LoginResponse authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtProvider.generateToken(userDetails.getUsername());
        RefreshToken checkExits = refreshTokenService.findByAccount(accountService.getAccountByEmail(userDetails.getUsername()));
        if(checkExits != null)
            refreshTokenService.deleteRefreshToken(checkExits.getToken());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUsername());
        logger.info("User logged in successfully!");
        return new LoginResponse(jwt, refreshToken.getToken());
    }

    @PostMapping(value = "/refreshtoken")
    public ResponseEntity<?> refreshtoken(@RequestBody String refreshRequest) {
        RefreshToken refreshToken = refreshTokenService.findByToken(refreshRequest);
        if(refreshToken == null)
            return ResponseEntity.badRequest().body("Invalid refresh token");
        if (refreshTokenService.verifyExpiration(refreshToken) == null) {
            return ResponseEntity.badRequest().body("Refresh token is expired!");
        }
        Account account = refreshToken.getAccount();
        String token = jwtProvider.generateToken(account.getEmail());
        logger.info("Token refreshed successfully!");
        return ResponseEntity.ok(new TokenRefreshResponse(token, refreshRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Account account) {
        if (accountService.existsByEmail(account.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already taken!");
        }
        accountService.addAccount(account);
        logger.info("User registered successfully!");
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/logoutpage")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        JwtProvider.blackList.add(accessToken);
        String email = jwtProvider.getEmailFromJWT(accessToken);
        Account account = accountService.getAccountByEmail(email);
        RefreshToken refreshToken = refreshTokenService.findByAccount(account);
        refreshTokenService.deleteRefreshToken(refreshToken.getToken());
        logger.info("User logged out successfully!");
        return ResponseEntity.ok("User logged out successfully!");
    }
}
