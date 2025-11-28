package com.apartment.reservation.dto.response

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class UserRoleResponseDTO(
    val userId: Long,
    val roleId: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) {
    val createdAt: String? = createdAt?.format(DateTimeFormatter.ISO_DATE_TIME)
    val updatedAt: String? = updatedAt?.format(DateTimeFormatter.ISO_DATE_TIME)
}