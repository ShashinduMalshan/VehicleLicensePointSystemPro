package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.CommonViolationDTO;
import com.service.vehiclelicensepointsystempro.Dto.DistrictReportDTO;
import com.service.vehiclelicensepointsystempro.Dto.RiskDistributionDTO;
import com.service.vehiclelicensepointsystempro.Entity.ViolationPoint;
import com.service.vehiclelicensepointsystempro.Repo.ViolationRepository;
import com.service.vehiclelicensepointsystempro.Service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ViolationRepository violationPointRepository;

    // 🔹 District name → ID mapping
    private static final Map<String, String> districtIdMap = new HashMap<>();

    static {
        districtIdMap.put("Colombo", "d1");
        districtIdMap.put("Gampaha", "d2");
        districtIdMap.put("Kalutara", "d3");
        districtIdMap.put("Kandy", "d4");
        districtIdMap.put("Matale", "d5");
        districtIdMap.put("Nuwara Eliya", "d6");
        districtIdMap.put("Galle", "d7");
        districtIdMap.put("Matara", "d8");
        districtIdMap.put("Hambantota", "d9");
        districtIdMap.put("Jaffna", "d10");
        districtIdMap.put("Kilinochchi", "d11");
        districtIdMap.put("Mannar", "d12");
        districtIdMap.put("Vavuniya", "d13");
        districtIdMap.put("Mullaitivu", "d14");
        districtIdMap.put("Batticaloa", "d15");
        districtIdMap.put("Ampara", "d16");
        districtIdMap.put("Trincomalee", "d17");
        districtIdMap.put("Kurunegala", "d18");
        districtIdMap.put("Puttalam", "d19");
        districtIdMap.put("Anuradhapura", "d20");
        districtIdMap.put("Polonnaruwa", "d21");
        districtIdMap.put("Badulla", "d22");
        districtIdMap.put("Monaragala", "d23");
        districtIdMap.put("Ratnapura", "d24");
        districtIdMap.put("Kegalle", "d25");
    }

    @Override
    public List<DistrictReportDTO> getDistrictReports() {

        List<ViolationPoint> all = violationPointRepository.findAll();

        Map<String, DistrictReportDTO> reports = new HashMap<>();
        Map<String, Map<String, Integer>> districtTimeCounts = new HashMap<>();
        Map<String, Map<String, Integer>> districtViolationCounts = new HashMap<>();

        // Process all violations
        for (ViolationPoint vp : all) {
            String districtName = vp.getLocation();

            // Initialize DTO if not already present
            reports.putIfAbsent(districtName, new DistrictReportDTO());
            DistrictReportDTO dto = reports.get(districtName);

            // 🔹 Set ID and name
            dto.setName(districtName);
            dto.setId(districtIdMap.getOrDefault(districtName, "unknown"));

            // Update basic counts
            dto.setViolations(dto.getViolations() + 1);

            if (vp.getDriver().getTotalPoint() > 120) {
                dto.setHighPoints(dto.getHighPoints() + 1);
            }
            if ("suspended".equalsIgnoreCase(vp.getDriver().getStatus())) {
                dto.setSuspended(dto.getSuspended() + 1);
            }
            dto.setPatrols(dto.getPatrols() + 1);

            // Count violations per time period
            LocalTime time = vp.getViolationTime();
            String period = getTimePeriod(time.getHour());

            districtTimeCounts.putIfAbsent(districtName, new HashMap<>());
            Map<String, Integer> timeCounts = districtTimeCounts.get(districtName);
            timeCounts.put(period, timeCounts.getOrDefault(period, 0) + 1);

            // Count common violations
            String violationType = vp.getLaw().getDescription();
            districtViolationCounts.putIfAbsent(districtName, new HashMap<>());
            Map<String, Integer> violationCounts = districtViolationCounts.get(districtName);
            violationCounts.put(violationType, violationCounts.getOrDefault(violationType, 0) + 1);
        }

        // Calculate risk distribution per district
        Map<String, RiskDistributionDTO> riskMap = getDistrictRiskDistribution();

        // Finalize each district report
        for (Map.Entry<String, DistrictReportDTO> entry : reports.entrySet()) {
            String districtName = entry.getKey();
            DistrictReportDTO dto = entry.getValue();

            // Peak violation time
            Map<String, Integer> timeCounts = districtTimeCounts.get(districtName);
            if (timeCounts != null && !timeCounts.isEmpty()) {
                String peakPeriod = Collections.max(timeCounts.entrySet(),
                        Map.Entry.comparingByValue()).getKey();
                dto.setPeakViolationTime(peakPeriod);
            }

            // Common violations with percentage
            Map<String, Integer> violationCounts = districtViolationCounts.get(districtName);
            List<CommonViolationDTO> commonViolations = new ArrayList<>();
            if (violationCounts != null) {
                for (Map.Entry<String, Integer> vEntry : violationCounts.entrySet()) {
                    CommonViolationDTO cvDto = new CommonViolationDTO();
                    cvDto.setType(vEntry.getKey());
                    cvDto.setPercentage((vEntry.getValue() * 100) / dto.getViolations());
                    commonViolations.add(cvDto);
                }
            }
            dto.setCommonViolations(commonViolations);

            // Set risk distribution and risk level
            RiskDistributionDTO risk = riskMap.get(districtName);
            dto.setRiskDistribution(risk);
            dto.setRisk(calculateRiskLevel(risk));
        }

        return new ArrayList<>(reports.values());
    }

    /**
     * Calculate district risk distribution based on yearly violation counts
     */
    public Map<String, RiskDistributionDTO> getDistrictRiskDistribution() {
        List<Object[]> result = violationPointRepository.countViolationsPerDistrictPerYear();
        Map<String, RiskDistributionDTO> districtRisk = new HashMap<>();

        int LOW_THRESHOLD = 5;
        int MEDIUM_THRESHOLD = 7;

        for (Object[] row : result) {
            String district = ((String) row[0]).trim();
            Long totalViolations = ((Number) row[2]).longValue();

            districtRisk.putIfAbsent(district, new RiskDistributionDTO());
            RiskDistributionDTO risk = districtRisk.get(district);

            if (totalViolations <= LOW_THRESHOLD) {
                risk.setLow(risk.getLow() + 1);
            } else if (totalViolations <= MEDIUM_THRESHOLD) {
                risk.setMedium(risk.getMedium() + 1);
            } else {
                risk.setHigh(risk.getHigh() + 1);
            }
        }

        return districtRisk;
    }

    /**
     * Determine district risk level from RiskDistributionDTO
     */
    private String calculateRiskLevel(RiskDistributionDTO risk) {
        if (risk == null) return "Unknown";

        int high = risk.getHigh();
        int medium = risk.getMedium();
        int low = risk.getLow();

        if (high >= medium && high >= low) return "Dangerous";
        if (medium >= high && medium >= low) return "Average";
        return "Normal";
    }

    /**
     * Map hour to a time period string
     */
    private String getTimePeriod(int hour) {
        if (hour >= 4 && hour < 7) return "Early Morning 4AM-7AM";
        if (hour >= 7 && hour < 12) return "Morning 7AM-12PM";
        if (hour >= 12 && hour < 16) return "Afternoon 12PM-4PM";
        if (hour >= 16 && hour < 20) return "Evening 4PM-8PM";
        if (hour >= 20 && hour < 24) return "Night 8PM-12AM";
        return "Late Night 12AM-4AM";
    }
}
