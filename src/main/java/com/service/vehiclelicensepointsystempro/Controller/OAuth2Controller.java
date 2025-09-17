package com.service.vehiclelicensepointsystempro.Controller;

import com.service.vehiclelicensepointsystempro.Dto.ApiResponse;
import com.service.vehiclelicensepointsystempro.Entity.User;
import com.service.vehiclelicensepointsystempro.Repo.UserRepository;
import com.service.vehiclelicensepointsystempro.Utill.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/oauth2")
@CrossOrigin(origins = "http://localhost:63342")
@RequiredArgsConstructor
public class OAuth2Controller {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @GetMapping("/success")
    public ResponseEntity<ApiResponse> success(@AuthenticationPrincipal OAuth2User oAuth2User) {

        try {
            String email = oAuth2User.getAttribute("email");

            if (email == null) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse(400, "Email not provided by Google", null)
                );
            }

            // lookup user in DB
            User user = userRepository.findByUserEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found for email: " + email));

            // generate token
            String jwtToken = jwtUtil.generateToken(user.getUsername(), user.getRole().name(), user.getUserEmail());
            System.out.println(user.getUsername());
            return ResponseEntity.ok(
                    new ApiResponse(
                            200,
                            "Google login successful",
                            Map.of(
                                    "token", jwtToken,
                                    "email", user.getUserEmail(),
                                    "name", user.getUsername(),

                                    "role", user.getRole().name()
                            )
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ApiResponse(500, "Internal Server Error: " + e.getMessage(), null)
            );
        }
    }
}
