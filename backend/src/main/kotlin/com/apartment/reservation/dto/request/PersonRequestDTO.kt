package com.apartment.reservation.dto.request

import com.apartment.reservation.model.enum.GenderType
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.LocalDate

data class PersonRequestDTO(
    @field:NotBlank
    val firstName: String,

    @field:NotBlank
    val lastName: String,

    @field:NotBlank
    val identityType: String,

    @field:NotBlank
    val identityValue: String,

    val gender: GenderType = GenderType.UNKNOWN,

    @field:NotNull
    val birthDate: LocalDate
)
