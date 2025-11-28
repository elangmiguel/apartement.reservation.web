package com.apartment.reservation.dto.response

import com.apartment.reservation.model.enum.UserStatus
import java.time.LocalDateTime

class UserResponseDTO(
    val username: String,
    val domain: String?,
    val email: String,
    val status: UserStatus,
    id: Long,
    createdAt: LocalDateTime? = null,
    updatedAt: LocalDateTime? = null
) : BaseResponseDTO(id, createdAt, updatedAt)

