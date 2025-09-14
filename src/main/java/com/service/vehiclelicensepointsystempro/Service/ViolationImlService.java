package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ViolationImlService {
    List<ViolationPointDto> getAllViolations();

    ResponseEntity<String> save(ViolationPointDto violationPointDto);
}
