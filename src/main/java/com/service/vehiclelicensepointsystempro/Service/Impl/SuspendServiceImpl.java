package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.SuspendLicDto;
import com.service.vehiclelicensepointsystempro.Entity.Driver;
import com.service.vehiclelicensepointsystempro.Entity.SuspendLic;
import com.service.vehiclelicensepointsystempro.Repo.DriverRepository;
import com.service.vehiclelicensepointsystempro.Repo.SuspendLicRepository;
import com.service.vehiclelicensepointsystempro.Service.SuspendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class SuspendServiceImpl implements SuspendService {

    private final DriverRepository driverRepository;
    private final SuspendLicRepository suspendLicRepository;

    @Override
    public ResponseEntity<String> saveSuspendedDriver(SuspendLic suspendLic){
        suspendLicRepository.save(suspendLic);

        return ResponseEntity.ok("Driver suspended successfully");

    }


}
