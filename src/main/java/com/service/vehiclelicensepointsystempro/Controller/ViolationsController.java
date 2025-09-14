package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.LawDto;
import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;
import com.service.vehiclelicensepointsystempro.Service.Impl.LawServiceImpl;
import com.service.vehiclelicensepointsystempro.Service.Impl.ViolationImlServiceImpl;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/violation")
@RestController
@RequiredArgsConstructor
public class ViolationsController {

    public final ViolationImlServiceImpl violationService;
    public final LawServiceImpl lawService;

    @GetMapping("/all")
//  @PreAuthorize("hasRole('Admin')")
    private List<ViolationPointDto> getAllViolations(){
        return violationService.getAllViolations();


    }@GetMapping("/laws")
//  @PreAuthorize("hasRole('Admin')")
    private List<LawDto> getAllTrafficLaw(){
        return lawService.getAllTrafficLaw();
    }

    @PostMapping("/violations")
//  @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<?> addViolation(@RequestBody ViolationPointDto dto) {
    try {

        return violationService.save(dto);
    } catch (Exception e) {
        e.printStackTrace(); // <-- see console log
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body(e.getMessage());
    }
}



}
