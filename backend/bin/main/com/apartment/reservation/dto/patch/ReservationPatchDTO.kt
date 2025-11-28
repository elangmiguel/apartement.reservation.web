package com.apartment.reservation.dto.patch

import java.time.LocalDate

data class ReservationPatchDTO(
    val apartmentId: Long? = null,
    val userId: Long? = null,
    val startDate: LocalDate? = null,
    val endDate: LocalDate? = null
)
