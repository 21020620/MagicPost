package com.example.magicpostbe.system_service.service;

import com.example.magicpostbe.system_service.entity.LogRec;
import com.example.magicpostbe.system_service.repository.LogRecRepository;
import com.example.magicpostbe.system_service.repository.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogServiceImpl implements LogService {
    @Autowired
    private LogRecRepository logRepository;

    public LogServiceImpl(LogRecRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Override
    public void addLog(LogRec logRec) {
        logRepository.save(logRec);
    }

    @Override
    public Long numberOfLogs() {
        return logRepository.count();
    }

    @Override
    public void clearLogs() {
        logRepository.deleteAll();
    }
}
