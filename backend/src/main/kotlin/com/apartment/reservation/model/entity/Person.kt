package com.apartment.reservation.model.entity

import com.apartment.reservation.model.enum.GenderType
import jakarta.persistence.*
import org.springframework.data.annotation.Id
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "persons", schema = "management")
class Person(

    @Column(nullable = false)
    var firstName: String,

    @Column(nullable = false)
    var lastName: String,

    var identityType: String? = null,

    @Column(unique = true)
    var identityValue: String? = null,

    @Enumerated(EnumType.STRING)
    var gender: GenderType = GenderType.UNKNOWN,

    @Column(name = "birth_date")
    var birthDate: LocalDate? = null,

    ) : BaseModel()