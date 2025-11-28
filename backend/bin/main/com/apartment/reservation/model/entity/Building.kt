package com.apartment.reservation.model.entity

import jakarta.persistence.*
import org.springframework.data.annotation.Id
import java.time.LocalDateTime
import kotlin.Long

@Entity
@Table(name = "buildings", schema = "management")
class Building(

    @Column(nullable = false)
    var name: String? = null,

    @Column(nullable = false)
    var address: String = "",

    ) : BaseModel()
