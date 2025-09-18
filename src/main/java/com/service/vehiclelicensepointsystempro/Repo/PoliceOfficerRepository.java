package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Entity.PoliceOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.jaas.JaasAuthenticationCallbackHandler;

import java.util.Optional;

public interface PoliceOfficerRepository extends JpaRepository <PoliceOfficer,Long>{
    Optional<PoliceOfficer> findByName(String name);
}
