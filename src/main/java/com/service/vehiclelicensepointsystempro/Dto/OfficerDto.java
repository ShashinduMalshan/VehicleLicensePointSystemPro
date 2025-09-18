package com.service.vehiclelicensepointsystempro.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OfficerDto {

    private Long officerId;
    private String username;
    private String email;
}
