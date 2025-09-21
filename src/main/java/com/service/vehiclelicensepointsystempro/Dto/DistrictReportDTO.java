package com.service.vehiclelicensepointsystempro.Dto;

import lombok.Data;

import java.util.List;

@Data
public class DistrictReportDTO {
    private String id;                // e.g. "d1"
    private String name;              // District name
    private String risk;              // dangerous/normal/average
    private int violations;           // total violations
    private int highPoints;           // drivers with high points
    private int suspended;            // suspended licenses
    private int patrols;              // active patrols
    private String peakViolationTime; // e.g. "Morning 7AM - 9AM"

    private List<CommonViolationDTO> commonViolations;
    private RiskDistributionDTO riskDistribution;
}