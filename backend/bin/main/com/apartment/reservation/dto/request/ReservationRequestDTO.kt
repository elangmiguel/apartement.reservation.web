package com.apartment.reservation.dto.request

import java.time.LocalDate
import jakarta.validation.constraints.NotNull

data class ReservationRequestDTO(
    @field:NotNull
    val apartmentId: Long,

    @field:NotNull
    val userId: Long,

    @field:NotNull
    val startDate: LocalDate,

    @field:NotNull
    val endDate: LocalDate
)
