package com.gese.firesecurity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GeseFireSecurityApplication {
    public static void main(String[] args) {
        SpringApplication.run(GeseFireSecurityApplication.class, args);
    }
}
