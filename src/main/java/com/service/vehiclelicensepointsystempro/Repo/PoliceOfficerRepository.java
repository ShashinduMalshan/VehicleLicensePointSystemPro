package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Entity.PoliceOfficer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.jaas.JaasAuthenticationCallbackHandler;

public interface PoliceOfficerRepository extends JpaRepository <PoliceOfficer,String>{
}
