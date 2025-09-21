package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.DistrictReportDTO;
import com.service.vehiclelicensepointsystempro.Service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin
@RequestMapping("/api/v1/reports")
@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/districts")
    public List<DistrictReportDTO> getReports() {
        return reportService.getDistrictReports();
    }
}
