package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.SuspendedDto;
import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;
import com.service.vehiclelicensepointsystempro.Service.Impl.ViolationImlServiceImpl;
import com.service.vehiclelicensepointsystempro.Service.SuspendService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/suspend")
@RestController
@RequiredArgsConstructor
public class SuspendedController {

    private final SuspendService suspendService;

    @GetMapping("/all")
    public Page<SuspendedDto> getAllSuspendedDrivers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size
    ) {
        return suspendService.getAllSuspendedDrivers(page, size);
    }
}
