package com.service.vehiclelicensepointsystempro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ViolationPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointId;

    private String description;
    private String location;
    private LocalTime violationTime;
    private LocalDate violationDate;

    @ManyToOne
    @JoinColumn(name = "officer_id")
    private PoliceOfficer officer;

    @ManyToOne
    @JoinColumn(name = "driver_license_number")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "revenue_license_number")
    private RevenueLic revenueLic;

    @ManyToOne
    @JoinColumn(name = "law_id")
    private TrafficViolationLaw law;

    @OneToMany(mappedBy = "violationPoint")
    private List<SuspendDetails> suspendDetails;
}
