package com.apartment.reservation.dto.response

import com.apartment.reservation.model.enum.GenderType
import java.time.LocalDate
import java.time.LocalDateTime

class PersonResponseDTO(
    val firstName: String,
    val lastName: String,
    val identityType: String,
    val identityValue: String,
    val gender: GenderType,
    val birthDate: LocalDate,
    id: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) : BaseResponseDTO(id, createdAt, updatedAt)

