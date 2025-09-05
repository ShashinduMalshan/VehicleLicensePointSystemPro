package com.service.vehiclelicensepointsystempro.Service;


import com.service.vehiclelicensepointsystempro.Dto.AuthResponse;
import com.service.vehiclelicensepointsystempro.Dto.LoginRequest;
import com.service.vehiclelicensepointsystempro.Dto.RegisterRequest;
import com.service.vehiclelicensepointsystempro.Entity.Role;
import com.service.vehiclelicensepointsystempro.Entity.User;
import com.service.vehiclelicensepointsystempro.Repo.UserRepository;
import com.service.vehiclelicensepointsystempro.Utill.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

   public AuthResponse authenticate(LoginRequest authDTO){
        // validate credentials
        User user = userRepository.findByUsername(authDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        // check password
        if (!passwordEncoder.matches(authDTO.getPassword(), user.getPassword())){
            throw new BadCredentialsException("Invalid credentials");
        }
        // generate token with username and role
        String token = jwtUtil.generateToken(authDTO.getUsername(), user.getRole().name());
        return new AuthResponse(token);
    }


    public String register(RegisterRequest registerDto){
        if (userRepository.findByUsername(registerDto.getUsername()).isPresent()){
            throw new BadCredentialsException("Username already exists");
        }

         User user = User.builder()
                .username(registerDto.getUsername())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                 .userEmail(registerDto.getUseremail())
                .role(Role.valueOf(registerDto.getRole()))
                .build();
        userRepository.save(user);
        return "User registered successfully";
    }





}