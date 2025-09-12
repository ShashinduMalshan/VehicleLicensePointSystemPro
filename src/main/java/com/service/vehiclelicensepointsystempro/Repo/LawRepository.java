package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Entity.TrafficViolationLaw;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LawRepository extends JpaRepository<TrafficViolationLaw,String> {

}
