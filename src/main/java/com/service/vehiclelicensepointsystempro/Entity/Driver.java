package com.service.vehiclelicensepointsystempro.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Driver {
    @Id
    @Pattern(regexp = "^B\\d{7}$", message = "License ID must be like 'B5866004'")
    private String lic;
    @Pattern(regexp = "^[A-Za-z ]{2,50}$", message = "Name must contain only letters and spaces (2-50 chars)")
    private String name;

    @NotBlank(message = "Email cannot be blank")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$", message = "Invalid email format")
    private String email;

    private int total_point;
}
