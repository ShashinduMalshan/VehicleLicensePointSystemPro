package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.LawDto;
import com.service.vehiclelicensepointsystempro.Entity.TrafficViolationLaw;
import com.service.vehiclelicensepointsystempro.Repo.LawRepository;
import com.service.vehiclelicensepointsystempro.Service.LawService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LawServiceImpl implements LawService {

    private final LawRepository lawRepository;
    private final ModelMapper modelMApper;

    @Override
    public List<LawDto> getAllTrafficLaw() {
             List<TrafficViolationLaw> all = lawRepository.findAll();
            return modelMApper.map(all,new TypeToken<List<LawDto>>(){}.getType());

    }


}
