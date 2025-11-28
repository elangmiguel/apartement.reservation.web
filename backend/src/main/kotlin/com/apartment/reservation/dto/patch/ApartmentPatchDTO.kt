package com.apartment.reservation.dto.patch

import com.apartment.reservation.model.enum.ApartmentStatus
import jakarta.validation.constraints.Min

data class ApartmentPatchDTO(
    val buildingId: Long? = null,
    @field:Min(1)
    val number: Int? = null,
    @field:Min(0)
    val floor: Int? = null,
    @field:Min(1)
    val capacity: Int? = null,
    val status: ApartmentStatus? = null
)
