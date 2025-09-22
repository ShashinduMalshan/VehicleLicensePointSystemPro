package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Entity.ViolationPoint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ViolationRepository extends JpaRepository<ViolationPoint ,String>{

    @Query("SELECT vp.location AS district, YEAR(vp.violationDate) AS year, COUNT(vp) AS total " +
       "FROM ViolationPoint vp " +
       "GROUP BY vp.location, YEAR(vp.violationDate) " +
       "ORDER BY vp.location, YEAR(vp.violationDate)")
    List<Object[]> countViolationsPerDistrictPerYear();

    List<ViolationPoint> findByDriverDrivingLicNum(String drivingLicNum);

    @Query("SELECT v FROM ViolationPoint v " +
           "WHERE v.driver.drivingLicNum = :driverId " +
           "ORDER BY v.violationDate DESC")
    Page<ViolationPoint> findViolationsByDriverId(@Param("driverId") String driverId, Pageable pageable);
}




