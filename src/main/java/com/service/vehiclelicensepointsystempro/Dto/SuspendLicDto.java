package com.service.vehiclelicensepointsystempro.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuspendLicDto {
    private Long suspendId;
    private String driverName;
    private String timeDuration;
    private Integer points;
    private String driverId; // reference to Driver entity
}
