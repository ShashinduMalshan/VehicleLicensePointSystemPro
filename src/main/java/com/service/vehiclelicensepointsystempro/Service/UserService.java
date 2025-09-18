package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.AdminDto;
import com.service.vehiclelicensepointsystempro.Dto.ApiResponse;
import com.service.vehiclelicensepointsystempro.Dto.ChangePassDto;
import com.service.vehiclelicensepointsystempro.Dto.OfficerDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    ResponseEntity<String> update(String currentUsername, String newUsername);

    ResponseEntity<ApiResponse> checkPassword(String username, String password);

    ResponseEntity<ApiResponse> changePassword(ChangePassDto changePassDto);

    List<AdminDto> getAllAdmins();

    List<AdminDto> getAllOfficers();

    ResponseEntity<ApiResponse> addAdmin(OfficerDto officerDto);
}
