package com.service.vehiclelicensepointsystempro.Entity;

import com.service.vehiclelicensepointsystempro.Entity.SuspendLic;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SuspendDetails {

    @Id
    private String suspendDetailId;

    private String description;

    @ManyToOne
    @JoinColumn(name = "suspend_id")
    private SuspendLic suspendLic;

    @ManyToOne
    @JoinColumn(name = "point_id")
    private ViolationPoint violationPoint;

}

