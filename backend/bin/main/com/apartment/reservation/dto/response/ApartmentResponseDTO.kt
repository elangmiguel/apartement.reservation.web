package com.apartment.reservation.dto.response

import com.apartment.reservation.model.enum.ApartmentStatus
import java.time.LocalDateTime

class ApartmentResponseDTO(
    val buildingId: Long,
    val number: Int,
    val floor: Int,
    val capacity: Int,
    val status: ApartmentStatus,
    val code: String?,
    id: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) : BaseResponseDTO(id, createdAt, updatedAt)
