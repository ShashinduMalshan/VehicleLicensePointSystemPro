package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.SuspendedDto;
import com.service.vehiclelicensepointsystempro.Entity.Driver;
import com.service.vehiclelicensepointsystempro.Entity.SuspendLic;
import com.service.vehiclelicensepointsystempro.Entity.ViolationPoint;
import com.service.vehiclelicensepointsystempro.Repo.DriverRepository;
import com.service.vehiclelicensepointsystempro.Repo.SuspendLicRepository;
import com.service.vehiclelicensepointsystempro.Repo.ViolationRepository;
import com.service.vehiclelicensepointsystempro.Service.SuspendService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SuspendServiceImpl implements SuspendService {

    private final ViolationRepository violationRepository;
    private final SuspendLicRepository suspendLicRepository;
    private final DriverRepository driverRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<String> saveSuspendedDriver(SuspendLic suspendLic){
        suspendLicRepository.save(suspendLic);

        return ResponseEntity.ok("Driver suspended successfully");

    }

    @Override
    public Page<SuspendedDto> getAllSuspendedDrivers(int page, int size) {
        List<SuspendedDto> dtos = suspendLicRepository.findAll().stream().map(suspend -> {

            // Communications
            List<SuspendedDto.Communication> communications = suspend.getNotifications() != null ?
                    suspend.getNotifications().stream()
                            .map(n -> new SuspendedDto.Communication(
                                    n.getDate() != null ? n.getDate().toString() : "",
                                    n.getDriverName()
                            )).collect(Collectors.toList()) : new ArrayList<>();

            // Triggering violation (taking latest ViolationPoint)
            ViolationPoint violation = suspend.getDriver() != null ?
                    violationRepository.findByDriverDrivingLicNum(suspend.getDriver().getDrivingLicNum())
                            .stream()
                            .sorted(Comparator.comparing(ViolationPoint::getViolationDate).reversed())
                            .findFirst().orElse(null) : null;

            SuspendedDto.TriggeringViolation triggeringViolation = violation != null ?
                    new SuspendedDto.TriggeringViolation(
                            violation.getLaw() != null ? violation.getLaw().getDescription() : "Other",
                            violation.getViolationDate() != null ? violation.getViolationDate().toString() : "",
                            violation.getLaw() != null ? violation.getLaw().getLawPoint() : 0,
                            violation.getOfficer() != null ? violation.getOfficer().getOfficerId().toString() : "N/A"
                    ) : null;

            // Reinstatement status mock (replace with actual logic if available)
            Map<String, String> reinstatementStatus = new HashMap<>();
            reinstatementStatus.put("period_served", "Completed");
            reinstatementStatus.put("fines_paid", "Pending");
            reinstatementStatus.put("course_completed", "Pending");
            reinstatementStatus.put("reinstatement_fee", "Pending");

            return new SuspendedDto(
                    suspend.getSuspendId(),
                    suspend.getDriver() != null ? suspend.getDriver().getDrivingLicNum() : "",
                    suspend.getDriverName(),
                    suspend.getTimeDuration(),       // Can be used as suspensionDate or duration
                    "High Points",                   // Reason placeholder
                    "https://i.pravatar.cc/150?u=" + suspend.getDriverName().replace(" ", "_"),
                    "Suspended",
                    reinstatementStatus,
                    new ArrayList<>(),               // Timeline removed
                    communications,
                    triggeringViolation
            );

        }).collect(Collectors.toList());

        int start = page * size;
        int end = Math.min(start + size, dtos.size());
        List<SuspendedDto> paged = dtos.subList(start, end);

        return new PageImpl<>(paged, PageRequest.of(page, size), dtos.size());
    }

    @Override
    public void deleteSuspendLic(String id){

        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        SuspendLic suspendLic = suspendLicRepository.findByDriver(driver)
                        .orElseThrow(() -> new RuntimeException("Suspended Driver not found"));

        suspendLicRepository.delete(suspendLic);
    }



}
