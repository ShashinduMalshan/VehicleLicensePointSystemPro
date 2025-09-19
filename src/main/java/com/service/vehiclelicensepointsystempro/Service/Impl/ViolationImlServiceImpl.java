package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;
import com.service.vehiclelicensepointsystempro.Entity.*;
import com.service.vehiclelicensepointsystempro.Exception.OfficerNotFoundException;
import com.service.vehiclelicensepointsystempro.Repo.*;
import com.service.vehiclelicensepointsystempro.Service.EmailNotificationService;
import com.service.vehiclelicensepointsystempro.Service.SuspendService;
import com.service.vehiclelicensepointsystempro.Service.ViolationImlService;
import jakarta.mail.MessagingException;
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
import java.util.Optional;

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

     @Autowired
     private SuspendLicRepository suspendLicRepository;

     @Autowired
     private SuspendService suspendService;

     @Autowired
     private final EmailNotificationService emailNotificationService;





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
    public ResponseEntity<String> save(ViolationPointDto violationPointDto) throws MessagingException {

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

    Optional<SuspendLic> suspendLic = suspendLicRepository
            .findByDriver(driver);


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

              if (suspendLic.isEmpty()){
                 SuspendLic suspend = SuspendLic.builder()
                                .driverName(driver.getName())
                                .timeDuration(String.valueOf(LocalTime.now().plusHours(1)))
                                .points(driver.getTotalPoint())
                                .driver(driver)
                                .build();
                ResponseEntity<String> stringResponseEntity = suspendService.saveSuspendedDriver(suspend);
                System.out.println("ResponseEntity<String> "+stringResponseEntity);
                        // notify by email
                        emailNotificationService.sendSuspensionHtmlEmail(
                                driver.getEmail(),
                                driver.getName(),
                                "Exceeded allowed points"
                        );

            }

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
