package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Dto.OfficerDto;
import com.service.vehiclelicensepointsystempro.Entity.AuthProvider;
import com.service.vehiclelicensepointsystempro.Entity.PoliceOfficer;
import com.service.vehiclelicensepointsystempro.Entity.Role;
import com.service.vehiclelicensepointsystempro.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByProviderAndUserEmail(AuthProvider provider, String userEmail);
    Optional<User> findByUserEmail(String email);
    List<User> findByRole(Role role);

    @Query("SELECT new com.service.vehiclelicensepointsystempro.Dto.OfficerDto(" +
           "o.officerId, u.username, u.userEmail) " +
           "FROM User u JOIN PoliceOfficer o ON u.username = o.name " +
           "WHERE u.role = 'Officer'")
    List<OfficerDto> findAllOfficerDtos();



}