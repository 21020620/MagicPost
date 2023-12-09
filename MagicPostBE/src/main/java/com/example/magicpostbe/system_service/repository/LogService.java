package com.example.magicpostbe.system_service.repository;

import com.example.magicpostbe.system_service.entity.LogRec;

public interface LogService {
    void addLog(LogRec logRec);
    Long numberOfLogs();
    void clearLogs();
}
