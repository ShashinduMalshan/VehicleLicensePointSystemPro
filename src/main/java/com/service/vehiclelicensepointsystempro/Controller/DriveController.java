package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.DriverDto;
import com.service.vehiclelicensepointsystempro.Service.Impl.DriverServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/driver")
@RestController
@RequiredArgsConstructor
public class DriveController {

    private final DriverServiceImpl driverService;

      @GetMapping("/all")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Page<DriverDto>> getAllDrivers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "18") int size) {

        return ResponseEntity.ok(driverService.getAllDrivers(page, size));
    }
}
