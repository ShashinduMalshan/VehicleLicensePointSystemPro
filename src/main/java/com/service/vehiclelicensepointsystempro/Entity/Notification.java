package com.service.vehiclelicensepointsystempro.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    private LocalDate date;
    private Integer point;
    private String driverName;

    @ManyToOne
    @JoinColumn(name = "suspend_id")
    private SuspendLic suspendLic;

}
