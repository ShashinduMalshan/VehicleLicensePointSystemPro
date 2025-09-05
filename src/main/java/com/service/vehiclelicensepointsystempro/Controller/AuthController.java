package com.service.vehiclelicensepointsystempro.Controller;


import com.service.vehiclelicensepointsystempro.Dto.ApiResponse;
import com.service.vehiclelicensepointsystempro.Dto.LoginRequest;
import com.service.vehiclelicensepointsystempro.Dto.RegisterRequest;
import com.service.vehiclelicensepointsystempro.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:63342")  // allow frontend origin

public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody RegisterRequest registerDto){
        return ResponseEntity.ok(
                new ApiResponse(
                        200,
                        "User Regi tor SuccessFull",
                        authService.register(registerDto)
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest authDto){
        return ResponseEntity.ok(
               new  ApiResponse(
                       200,
                       "Ok",
                       authService.authenticate(authDto)
               )
        );
    }


}
