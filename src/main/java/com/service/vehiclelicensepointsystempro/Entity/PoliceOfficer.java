package com.service.vehiclelicensepointsystempro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PoliceOfficer {

    @Id
    private String officerId;

    private String name;
    private String dutyLocation;

    @OneToMany(mappedBy = "officer")
    private List<User> users;

    @OneToMany(mappedBy = "officer")
    private List<ViolationPoint> violationPoints;
}
