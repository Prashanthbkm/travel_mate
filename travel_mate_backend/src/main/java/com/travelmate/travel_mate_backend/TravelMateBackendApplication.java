package com.travelmate.travel_mate_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication

public class TravelMateBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelMateBackendApplication.class, args);
	}

}
