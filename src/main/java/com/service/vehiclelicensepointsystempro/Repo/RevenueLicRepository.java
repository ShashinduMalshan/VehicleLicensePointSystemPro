package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Entity.RevenueLic;
import com.service.vehiclelicensepointsystempro.Entity.TrafficViolationLaw;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RevenueLicRepository extends JpaRepository<RevenueLic,String> {
}
