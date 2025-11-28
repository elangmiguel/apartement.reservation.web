package com.apartment.reservation.model.entity

import jakarta.persistence.*

@Entity
@Table(name = "roles", schema = "management")
class Role(

    @Column(nullable = false, unique = true)
    var name: String

) : BaseModel()
