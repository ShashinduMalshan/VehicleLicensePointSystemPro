package com.service.vehiclelicensepointsystempro.Repo;

import com.service.vehiclelicensepointsystempro.Entity.Driver;
import com.service.vehiclelicensepointsystempro.Entity.SuspendLic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SuspendLicRepository extends JpaRepository <SuspendLic,Long>{
    Optional<SuspendLic> findByDriver(Driver driver);
}
