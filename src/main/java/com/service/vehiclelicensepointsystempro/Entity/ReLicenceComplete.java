package com.service.vehiclelicensepointsystempro.Entity;

import com.service.vehiclelicensepointsystempro.Entity.Driver;
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
public class ReLicenceComplete {

    @Id
    private String testId;

    private Integer lastScore;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    // getters and setters
}
