package com.apartment.reservation

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.persistence.autoconfigure.EntityScan
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@EnableJpaRepositories("com.apartment.reservation.repository")
@EntityScan("com.apartment.reservation.model.entity")
class WebApartmentReservationSystemApplication

fun main(args: Array<String>) {
    runApplication<WebApartmentReservationSystemApplication>(*args)
}
