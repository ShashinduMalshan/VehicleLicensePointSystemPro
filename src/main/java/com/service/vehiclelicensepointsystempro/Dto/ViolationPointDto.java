package com.service.vehiclelicensepointsystempro.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ViolationPointDto {

    private String pointId;
    private String description;
    private String location;
    private LocalTime violationTime;
    private LocalDate violationDate;
    private String officerId;
    private String driver;
    private String revenueLic;
    private String lawId;
}
