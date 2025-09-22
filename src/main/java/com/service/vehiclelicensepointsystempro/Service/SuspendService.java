package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.SuspendLicDto;
import com.service.vehiclelicensepointsystempro.Dto.SuspendedDto;
import com.service.vehiclelicensepointsystempro.Entity.SuspendLic;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

public interface SuspendService {

    ResponseEntity<String> saveSuspendedDriver(SuspendLic suspendLic);

    Page<SuspendedDto> getAllSuspendedDrivers(int page, int size);

    void deleteSuspendLic(String id);
}
