package com.service.vehiclelicensepointsystempro.Service;


import com.service.vehiclelicensepointsystempro.Dto.AuthResponse;
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

   public AuthResponse authenticate(com.service.vehiclelicensepointsystempro.Dto.LoginRequest authDTO){
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

    // Generate a JWT token for a given user (used by OAuth2Controller)
    public String generateToken(User user) {
        String username = user.getUsername();
        String role = user.getRole() != null ? user.getRole().name() : null;
        if (role != null) {
            return jwtUtil.generateToken(username, role);
        }
        return jwtUtil.generateToken(username);
    }

    public String register(RegisterRequest registerDto){
        if (userRepository.findByUsername(registerDto.getUsername()).isPresent()){
            throw new BadCredentialsException("Username already exists");
        }

         User user = User.builder()
                .username(registerDto.getUsername())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                 .userEmail(registerDto.getUserEmail())
                .role(Role.valueOf(registerDto.getRole()))
                .build();
        userRepository.save(user);
        return "User registered successfully";
    }

}