package com.service.vehiclelicensepointsystempro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RevenueLic {

    @Id
    private String licNum;

    private LocalDate dateOfIssue;
    private LocalDate expiresDate;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private VehicleOwner owner;

    @OneToMany(mappedBy = "revenueLic")
    private List<ViolationPoint> violationPoints;
}
