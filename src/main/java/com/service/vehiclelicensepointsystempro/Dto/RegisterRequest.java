package com.service.vehiclelicensepointsystempro.Dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String useremail;
    private String password;
    private String role; // USER or ADMIN
}