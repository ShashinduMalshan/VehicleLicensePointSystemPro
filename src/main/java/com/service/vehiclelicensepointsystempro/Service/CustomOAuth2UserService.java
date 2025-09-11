package com.service.vehiclelicensepointsystempro.Service;

import com.service.vehiclelicensepointsystempro.Dto.OAuth2UserInfo;
import com.service.vehiclelicensepointsystempro.Entity.AuthProvider;
import com.service.vehiclelicensepointsystempro.Entity.Role;
import com.service.vehiclelicensepointsystempro.Entity.User;
import com.service.vehiclelicensepointsystempro.Repo.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String sub = oAuth2User.getAttribute("sub");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Wrap into DTO
        OAuth2UserInfo userInfo = new OAuth2UserInfo(sub, email, name);

        // Check if user exists by provider and email (stable identifiers for Google)
        User user = userRepository
                .findByProviderAndUserEmail(AuthProvider.GOOGLE, email)
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .username("google_" + sub)
                                .userEmail(email)
                                .password("oauth2user") // or generate random UUID
                                .provider(AuthProvider.GOOGLE)
                                .role(Role.Driver)
                                .build()
                ));

        return oAuth2User; // You can wrap with a custom user if needed
    }
}
