package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;
import com.service.vehiclelicensepointsystempro.Entity.*;
import com.service.vehiclelicensepointsystempro.Exception.OfficerNotFoundException;
import com.service.vehiclelicensepointsystempro.Repo.*;
import com.service.vehiclelicensepointsystempro.Service.ViolationImlService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ViolationImlServiceImpl implements ViolationImlService {

    private final ViolationRepository violationRepository;
    private final ModelMapper modelMApper;

    @Autowired
    private RevenueLicRepository revenueLicRepository;

    @Autowired
    private LawRepository lawRepository;

    @Autowired
    private PoliceOfficerRepository policeOfficerRepository;

    @Autowired
    private DriverRepository driverRepository;



    @Override
    public List<ViolationPointDto> getAllViolations() {

    List<ViolationPoint> all = violationRepository.findAll();

    return all.stream().map(vp -> {
            ViolationPointDto dto = new ViolationPointDto();
            dto.setPointId(vp.getPointId());
            dto.setDescription(vp.getDescription());
            dto.setLocation(vp.getLocation());
            dto.setViolationTime(vp.getViolationTime());
            dto.setViolationDate(vp.getViolationDate());

            // Map IDs from related entities
            dto.setOfficerId(vp.getOfficer() != null ? vp.getOfficer().getOfficerId() : null);
            dto.setDriver(vp.getDriver() != null ? vp.getDriver().getDrivingLicNum() : null);
            dto.setRevenueLic(vp.getRevenueLic() != null ? vp.getRevenueLic().getLicNum() : null);
            dto.setLawId(vp.getLaw() != null ? vp.getLaw().getLawId() : null);

            return dto;
        }).toList();
    }


    @Override
    @Transactional
    public ResponseEntity<String> save(ViolationPointDto violationPointDto) {

     RevenueLic revenueLic = revenueLicRepository
        .findById(violationPointDto.getRevenueLic())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Revenue License not found"));

    TrafficViolationLaw law = lawRepository
        .findById(String.valueOf(violationPointDto.getLawId()))
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Law not found"));

    PoliceOfficer officer = policeOfficerRepository
        .findById(violationPointDto.getOfficerId())
        .orElseThrow(() -> new OfficerNotFoundException("Officer not found "));

    Driver driver = driverRepository
        .findById(violationPointDto.getDriver())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Driver not found"));

        ViolationPoint violationPoint = ViolationPoint.builder()
                .description(violationPointDto.getDescription())
                .location(violationPointDto.getLocation())
                .violationDate(LocalDate.now())
                .violationTime(LocalTime.now())
                .driver(driver)
                .officer(officer)
                .revenueLic(revenueLic)
                .law(law)                 
                .build();

        violationRepository.save(violationPoint);


        // Update driver total point

        driver.setTotalPoint(driver.getTotalPoint()  + law.getLawPoint());
        if (driver.getTotalPoint() > 150) {
            if (!driver.getStatus().equals("suspended")){
                driver.setStatus("suspended");
            }else {
                return ResponseEntity.ok("Driver is already suspended");
            }
        }
        driverRepository.save(driver);


        return ResponseEntity.ok("Violation logged successfully");
    }



}
