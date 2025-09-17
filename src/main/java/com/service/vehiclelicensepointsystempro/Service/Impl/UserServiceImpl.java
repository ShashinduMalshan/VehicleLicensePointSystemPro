package com.service.vehiclelicensepointsystempro.Service.Impl;

import com.service.vehiclelicensepointsystempro.Dto.ApiResponse;
import com.service.vehiclelicensepointsystempro.Dto.ChangePassDto;
import com.service.vehiclelicensepointsystempro.Entity.User;
import com.service.vehiclelicensepointsystempro.Repo.UserRepository;
import com.service.vehiclelicensepointsystempro.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public ResponseEntity<String> update(String currentUsername, String newUsername) {

         User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(newUsername);
        userRepository.save(user);

        return ResponseEntity.ok("Username updated successfully");
    }

    @Override
    public ResponseEntity<ApiResponse> checkPassword(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.ok(new ApiResponse(200, "Success", "Password is correct"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(401,"Invalid credentials", "Password is incorrect"));
        }
    }

    @Override
    public ResponseEntity<ApiResponse> changePassword(ChangePassDto changePassDto) {

        User user = userRepository.findByUsername(changePassDto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ;if (passwordEncoder.matches(changePassDto.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePassDto.getNewPassword()));
            userRepository.save(user);
            return ResponseEntity.ok(new ApiResponse(200, "Success", "Password changed successfully"));
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(401,"Invalid credentials", "Password is incorrect"));
        }


    }





}
