package com.apartment.reservation.model.entity

import com.apartment.reservation.model.enum.ApartmentStatus
import jakarta.persistence.*
import org.springframework.data.annotation.Id
import java.time.LocalDateTime

@Entity
@Table(
    name = "apartments",
    schema = "management",
    uniqueConstraints = [
        UniqueConstraint(columnNames = ["building_id", "floor", "number"])
    ]
)
class Apartment(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    var building: Building,

    @Column(nullable = false)
    var number: Int,

    @Column(nullable = false)
    var floor: Int,

    @Column(nullable = false)
    var capacity: Int = 1,

    @Enumerated(EnumType.STRING)
    var status: ApartmentStatus = ApartmentStatus.AVAILABLE,

    @Column(insertable = false, updatable = false)
    var code: String? = null,

    @Column(insertable = false, updatable = false)
    var period: String? = null
) : BaseModel()
