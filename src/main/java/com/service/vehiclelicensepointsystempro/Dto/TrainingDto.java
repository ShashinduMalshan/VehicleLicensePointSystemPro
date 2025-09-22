package com.service.vehiclelicensepointsystempro.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrainingDto {
    private String driverId; // use driving license number or driver ID
    private String name;     // training name
    private LocalDate duration;
    private Integer suspendedPoint;
}
