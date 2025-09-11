package com.service.vehiclelicensepointsystempro.Entity;

import com.service.vehiclelicensepointsystempro.Entity.Driver;
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
public class SuspendLic {

    @Id
    private String suspendId;

    private String driverName;
    private String timeDuration;
    private Integer points;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @OneToMany(mappedBy = "suspendLic")
    private List<Notification> notifications;

    @OneToMany(mappedBy = "suspendLic")
    private List<SuspendDetails> suspendDetails;

}
