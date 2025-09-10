package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Entity.AuthProvider;
import com.service.vehiclelicensepointsystempro.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByProviderId(String providerId); // now it works
    Optional<User> findByProviderAndUserEmail(AuthProvider provider, String userEmail);
    Optional<User> findByUserEmail(String email);
}