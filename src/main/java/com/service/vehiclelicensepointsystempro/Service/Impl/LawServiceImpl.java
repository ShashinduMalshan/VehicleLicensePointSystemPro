package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.LawDto;
import com.service.vehiclelicensepointsystempro.Entity.TrafficViolationLaw;
import com.service.vehiclelicensepointsystempro.Repo.LawRepository;
import com.service.vehiclelicensepointsystempro.Service.LawService;
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
public class LawServiceImpl implements LawService {

    private final LawRepository lawRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<LawDto> getAllTrafficLaw() {
             List<TrafficViolationLaw> all = lawRepository.findAll();
            return modelMapper.map(all,new TypeToken<List<LawDto>>(){}.getType());

    }
    @Override
    public Page<LawDto> getAllTrafficLaw(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("lawId").ascending());
        Page<TrafficViolationLaw> lawPage = lawRepository.findAll(pageable);

        return lawPage.map(law -> modelMapper.map(law, LawDto.class));
    }




}
