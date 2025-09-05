package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.DriverDto;
import com.service.vehiclelicensepointsystempro.Service.Impl.DriverServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/driver")
@RestController
@RequiredArgsConstructor
public class DriveController {

    private final DriverServiceImpl driverService;

    @GetMapping("all")
    @PreAuthorize("hasRole('Admin')")
    public List<DriverDto> getAllJobs() {
        return driverService.getAllDrivers();
    }
}
