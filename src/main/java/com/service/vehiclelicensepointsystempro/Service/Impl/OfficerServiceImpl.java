package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.OfficerDto;
import com.service.vehiclelicensepointsystempro.Entity.PoliceOfficer;
import com.service.vehiclelicensepointsystempro.Repo.PoliceOfficerRepository;
import com.service.vehiclelicensepointsystempro.Service.OfficerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfficerServiceImpl implements OfficerService {

    private final ModelMapper modelMApper;
    private final PoliceOfficerRepository policeOfficerRepository;

    @Override
    public List<OfficerDto> getAllOfficers(){
        List<PoliceOfficer> policeOfficer = policeOfficerRepository.findAll();
        return modelMApper.map(policeOfficer,new TypeToken<List<OfficerDto>>(){}.getType());

    }

}
