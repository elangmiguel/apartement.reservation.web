package com.apartment.reservation.dto.response

import java.time.LocalDateTime

class BuildingResponseDTO(
    val name: String,
    val address: String,
    id: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) : BaseResponseDTO(id, createdAt, updatedAt)
