package com.apartment.reservation.model.entity

import com.apartment.reservation.model.entity.BaseModel
import jakarta.persistence.*
import org.springframework.data.annotation.Id
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "reservations", schema = "management")
class Reservation(

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id", nullable = false)
    var apartment: Apartment,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,

    @Column(nullable = false)
    var startDate: LocalDate,

    @Column(nullable = false)
    var endDate: LocalDate,

    ) : BaseModel()