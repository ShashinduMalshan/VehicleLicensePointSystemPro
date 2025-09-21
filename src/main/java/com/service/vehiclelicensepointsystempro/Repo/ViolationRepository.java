package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Entity.ViolationPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ViolationRepository extends JpaRepository<ViolationPoint ,String>{

    @Query("SELECT vp.location AS district, YEAR(vp.violationDate) AS year, COUNT(vp) AS total " +
       "FROM ViolationPoint vp " +
       "GROUP BY vp.location, YEAR(vp.violationDate) " +
       "ORDER BY vp.location, YEAR(vp.violationDate)")
    List<Object[]> countViolationsPerDistrictPerYear();



}
