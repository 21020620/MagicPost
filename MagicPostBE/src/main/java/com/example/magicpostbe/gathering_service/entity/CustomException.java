package com.example.magicpostbe.gathering_service.entity;

public class CustomException extends RuntimeException{
    public CustomException(String message) {
        super("Custom Exception: " + message);
    }
}
