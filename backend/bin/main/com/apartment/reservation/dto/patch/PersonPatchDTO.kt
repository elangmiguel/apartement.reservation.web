package com.apartment.reservation.dto.patch

import com.apartment.reservation.model.enum.GenderType
import java.time.LocalDate

data class PersonPatchDTO(
    val firstName: String? = null,
    val lastName: String? = null,
    val identityType: String? = null,
    val identityValue: String? = null,
    val gender: GenderType? = null,
    val birthDate: LocalDate? = null
)
