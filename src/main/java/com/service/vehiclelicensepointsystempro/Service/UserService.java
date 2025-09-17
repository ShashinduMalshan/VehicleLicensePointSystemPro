package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.ApiResponse;
import com.service.vehiclelicensepointsystempro.Dto.ChangePassDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<String> update(String currentUsername, String newUsername);

    ResponseEntity<ApiResponse> checkPassword(String username, String password);

    ResponseEntity<ApiResponse> changePassword(ChangePassDto changePassDto);
}
