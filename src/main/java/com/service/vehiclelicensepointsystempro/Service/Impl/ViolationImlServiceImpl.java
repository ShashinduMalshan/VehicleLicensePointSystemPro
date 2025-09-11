package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.ViolationPointDto;
import com.service.vehiclelicensepointsystempro.Entity.ViolationPoint;
import com.service.vehiclelicensepointsystempro.Repo.ViolationRepository;
import com.service.vehiclelicensepointsystempro.Service.ViolationImlService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ViolationImlServiceImpl implements ViolationImlService {

    private final ViolationRepository violationRepository;
    private final ModelMapper modelMApper;

    @Override
    public List<ViolationPointDto> getAllViolations() {

        List<ViolationPoint> all = violationRepository.findAll();
    return all.stream().map(vp -> {
            ViolationPointDto dto = new ViolationPointDto();
            dto.setPointId(vp.getPointId());
            dto.setDescription(vp.getDescription());
            dto.setLocation(vp.getLocation());
            dto.setViolationTime(vp.getViolationTime());
            dto.setViolationDate(vp.getViolationDate());

            // Map IDs from related entities
            dto.setOfficerId(vp.getOfficer() != null ? vp.getOfficer().getOfficerId() : null);
            dto.setDriver(vp.getDriver() != null ? vp.getDriver().getDrivingLicNum() : null);
            dto.setRevenueLic(vp.getRevenueLic() != null ? vp.getRevenueLic().getLicNum() : null);
            dto.setLawId(vp.getLaw() != null ? vp.getLaw().getLawId() : null);

            return dto;
        }).toList();
    }


}
