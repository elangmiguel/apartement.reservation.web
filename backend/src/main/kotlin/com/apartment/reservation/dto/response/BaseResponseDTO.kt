package com.apartment.reservation.dto.response

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

/**
 * Base class for all entity's response
 * includes id and auditory fields.
 */
open class BaseResponseDTO(
    val id: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) {
    val createdAt: String? = createdAt?.format(DateTimeFormatter.ISO_DATE_TIME)
    val updatedAt: String? = updatedAt?.format(DateTimeFormatter.ISO_DATE_TIME)
}
