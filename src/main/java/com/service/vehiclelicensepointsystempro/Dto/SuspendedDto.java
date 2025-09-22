package com.service.vehiclelicensepointsystempro.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuspendedDto {
    private Long id;  // driver id
    private String drivingLicNum;
    private String name;
    private String suspensionDate;
    private String reason;
    private String photo;
    private String status;

    // Map for reinstatement status (period_served, fines_paid, etc.)
    private Map<String, String> reinstatement_status;

    // Timeline of events
    private List<TimelineItem> timeline;

    // Communication logs
    private List<Communication> communications;

    // Triggering violation details
    private TriggeringViolation triggeringViolation;

    // --- Nested DTOs ---
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimelineItem {
        private String date;
        private String event;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Communication {
        private String date;
        private String note;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TriggeringViolation {
        private String type;
        private String date;
        private int points;
        private String officerId;
    }
}
