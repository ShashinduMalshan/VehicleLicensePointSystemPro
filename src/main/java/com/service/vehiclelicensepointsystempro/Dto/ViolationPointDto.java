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

    private Long pointId;
    private String description;
    private String location;
    private LocalTime violationTime;
    private LocalDate violationDate;
    private Long officerId;
    private String driver;
    private String revenueLic;
    private Long lawId;
}
