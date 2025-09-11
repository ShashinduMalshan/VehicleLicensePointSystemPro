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
public class Vehicle {

    @Id
    private String vehicleId;

    private String model;
    private String brandName;
    private String description;

    @OneToMany(mappedBy = "vehicle")
    private List<VehicleOwner> vehicleOwners;

    // getters and setters
}
