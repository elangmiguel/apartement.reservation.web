package com.apartment.reservation.dto.response

import java.time.LocalDate
import java.time.LocalDateTime

class ReservationResponseDTO(
    val apartmentId: Long,
    val userId: Long,
    val startDate: LocalDate,
    val endDate: LocalDate,
    id: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) : BaseResponseDTO(id, createdAt, updatedAt)

