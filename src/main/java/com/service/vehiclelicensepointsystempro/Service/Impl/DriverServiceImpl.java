package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.DriverDto;
import com.service.vehiclelicensepointsystempro.Entity.Driver;
import com.service.vehiclelicensepointsystempro.Repo.DriverRepository;
import com.service.vehiclelicensepointsystempro.Service.DriverService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<DriverDto> getAllDrivers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("drivingLicNum").ascending());
        Page<Driver> driverPage = driverRepository.findAll(pageable);

        // Convert Entity → DTO using ModelMapper + Builder
        return driverPage.map(driver -> modelMapper.map(driver, DriverDto.class));
    }


}
