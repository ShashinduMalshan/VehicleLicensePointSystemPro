package com.service.vehiclelicensepointsystempro.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "Driver")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Driver {

    @Id
    @Column(name = "driving_lic_num", length = 50, nullable = false)
    @Pattern(regexp = "^B\\d{7}$", message = "License ID must be like 'B5866004'")
    private String drivingLicNum;

    @Column(name = "name", length = 100, nullable = false)
    @Pattern(regexp = "^[A-Za-z ]{2,50}$", message = "Name must contain only letters and spaces (2-50 chars)")
    private String name;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    @NotBlank(message = "Email cannot be blank")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$", message = "Invalid email format")
    private String email;

    @Column(name = "total_point")
    private Integer totalPoint;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "driver")
    private List<ReLicenceComplete> reLicenceCompletes;

    @OneToMany(mappedBy = "driver")
    private List<SuspendLic> suspendLicenses;

    @OneToMany(mappedBy = "driver")
    private List<Training> trainings;

    @OneToMany(mappedBy = "driver")
    private List<ViolationPoint> violationPoints;
}
