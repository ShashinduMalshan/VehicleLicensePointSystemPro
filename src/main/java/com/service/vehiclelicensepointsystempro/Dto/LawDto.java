package com.service.vehiclelicensepointsystempro.Dto;

import com.service.vehiclelicensepointsystempro.Entity.ViolationPoint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LawDto {

    private String lawId;
    private String description;
    private Integer lawPoint;

}
