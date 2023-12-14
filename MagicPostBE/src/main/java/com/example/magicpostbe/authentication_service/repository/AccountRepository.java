package com.example.magicpostbe.authentication_service.repository;

import com.example.magicpostbe.authentication_service.entity.Account;

public interface AccountRepository {
    void addAccount(Account account);
    void deleteAccount(String email);
    String getAllAccounts();
    Account getAccountByEmail(String email);
    boolean existsByEmail(String email);
}
