package com.apartment.reservation.model.entity

import com.apartment.reservation.model.enum.GenderType
import jakarta.persistence.*
import java.time.LocalDate


@Entity
@Table(name = "persons", schema = "management")
class Person(

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = true)
    var user: User? = null,

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