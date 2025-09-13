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
public class TrafficViolationLaw {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lawId;

    private String description;
    private Integer lawPoint;

    @OneToMany(mappedBy = "law")
    private List<ViolationPoint> violationPoints;

}
