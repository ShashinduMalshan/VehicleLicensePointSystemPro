package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.DriverDto;
import com.service.vehiclelicensepointsystempro.Entity.Driver;
import com.service.vehiclelicensepointsystempro.Repo.DriverRepository;
import com.service.vehiclelicensepointsystempro.Service.DriverService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverServiceImpl implements DriverService {

    private final DriverRepository driverRepository;
    private final ModelMapper modelMApper;

    @Override
    public List<DriverDto> getAllDrivers() {
             List<Driver> all = driverRepository.findAll();
            return modelMApper.map(all,new TypeToken<List<DriverDto>>(){}.getType());

    }

}
