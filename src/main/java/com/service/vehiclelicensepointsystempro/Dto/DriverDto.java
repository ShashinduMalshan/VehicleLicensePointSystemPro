package com.service.vehiclelicensepointsystempro.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriverDto {

    private String lic;
    private String name;
    private String email;
    private int total_point;
}


