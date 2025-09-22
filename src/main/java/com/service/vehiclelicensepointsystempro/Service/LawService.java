package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.LawDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LawService {
    List<LawDto> getAllTrafficLaw();


    Page<LawDto> getAllTrafficLaw(int page, int size);
}
