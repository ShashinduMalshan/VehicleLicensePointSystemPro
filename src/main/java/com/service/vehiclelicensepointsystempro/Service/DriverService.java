package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.DriverDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DriverService {

    Page<DriverDto> getAllDrivers(int page, int size);
}
