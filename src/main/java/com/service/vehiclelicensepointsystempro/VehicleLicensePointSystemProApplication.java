package com.service.vehiclelicensepointsystempro;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VehicleLicensePointSystemProApplication {

    public static void main(String[] args) {
        SpringApplication.run(VehicleLicensePointSystemProApplication.class, args);
    }
    @Bean
	public ModelMapper modelMApper(){
		return new ModelMapper();
	}



}
