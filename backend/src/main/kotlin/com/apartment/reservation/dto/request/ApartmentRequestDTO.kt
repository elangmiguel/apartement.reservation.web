package com.apartment.reservation.dto.request

import com.apartment.reservation.model.enum.ApartmentStatus
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull

data class ApartmentRequestDTO(
    @field:NotNull
    val buildingId: Long,

    @field:Min(1)
    val number: Int,

    @field:Min(0)
    val floor: Int,

    @field:Min(1)
    val capacity: Int = 1,

    val status: ApartmentStatus = ApartmentStatus.AVAILABLE
)
