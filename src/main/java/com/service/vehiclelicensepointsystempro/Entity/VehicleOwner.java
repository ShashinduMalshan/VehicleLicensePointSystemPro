package com.service.vehiclelicensepointsystempro.Entity;

import com.service.vehiclelicensepointsystempro.Entity.Vehicle;
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
public class VehicleOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ownerId;

    private String name;
    private String email;
    private String address;
    private String mobileNo;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @OneToMany(mappedBy = "owner")
    private List<RevenueLic> revenueLicenses;

    // getters and setters
}
