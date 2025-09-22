package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ViolationImlService {

    Page<ViolationPointDto> getAllViolations(int page, int size);

    ResponseEntity<String> save(ViolationPointDto violationPointDto) throws MessagingException;

    List<ViolationPointDto> getViolationByDriverId(String driverId, int page, int size);
}
