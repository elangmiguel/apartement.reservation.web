package com.apartment.reservation.dto.response

import com.apartment.reservation.model.enum.ContactType
import java.time.LocalDateTime

class ContactResponseDTO(
    val personId: Long,
    val type: ContactType,
    val value: String,
    val isMain: Boolean,
    id: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) : BaseResponseDTO(id, createdAt, updatedAt)

