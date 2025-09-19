package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.SuspendLicDto;
import com.service.vehiclelicensepointsystempro.Entity.SuspendLic;
import org.springframework.http.ResponseEntity;

public interface SuspendService {
    ResponseEntity<String> saveSuspendedDriver(SuspendLic suspendLic);
}
