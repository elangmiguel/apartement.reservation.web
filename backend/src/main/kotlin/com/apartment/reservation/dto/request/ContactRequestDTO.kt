package com.apartment.reservation.dto.request

import com.apartment.reservation.model.enum.ContactType
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

data class ContactRequestDTO(
    @field:NotNull
    val personId: Long,

    @field:NotNull
    val type: ContactType,

    @field:NotBlank
    val value: String,

    val main: Boolean = false
)
