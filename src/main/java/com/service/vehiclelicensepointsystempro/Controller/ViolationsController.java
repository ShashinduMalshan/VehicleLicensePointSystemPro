package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;
import com.service.vehiclelicensepointsystempro.Service.Impl.ViolationImlServiceImpl;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/violation")
@RestController
@RequiredArgsConstructor
public class ViolationsController {

    public final ViolationImlServiceImpl violationService;

    @GetMapping("/all")
//    @PreAuthorize("hasRole('Admin')")
    private List<ViolationPointDto> getAllViolations(){
        return violationService.getAllViolations();
    }


}
