package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.DistrictReportDTO;
import com.service.vehiclelicensepointsystempro.Entity.ViolationPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportService{
    List<DistrictReportDTO> getDistrictReports();
}
