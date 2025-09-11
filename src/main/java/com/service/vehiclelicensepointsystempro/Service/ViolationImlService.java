package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;

import java.util.List;

public interface ViolationImlService {
    List<ViolationPointDto> getAllViolations();
}
