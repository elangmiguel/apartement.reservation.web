package com.apartment.reservation.dto.response

import java.time.LocalDateTime

class RoleResponseDTO(
    val name: String,
    id: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) : BaseResponseDTO(id, createdAt, updatedAt)

