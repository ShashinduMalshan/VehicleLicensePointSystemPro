package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.DriverDto;
import com.service.vehiclelicensepointsystempro.Dto.LawDto;
import com.service.vehiclelicensepointsystempro.Service.Impl.LawServiceImpl;
import com.service.vehiclelicensepointsystempro.Service.LawService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/law")
@RestController
@RequiredArgsConstructor
public class LowController {

    private final LawService lawService;

    @GetMapping("/all")
//    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Page<LawDto>> getAllLaws(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size) {

        return ResponseEntity.ok(lawService.getAllTrafficLaw(page, size));
    }}
