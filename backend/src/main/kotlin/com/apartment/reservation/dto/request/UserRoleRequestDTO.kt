package com.apartment.reservation.dto.request

import jakarta.validation.constraints.NotNull

data class UserRoleRequestDTO(
    @field:NotNull
    val userId: Long,

    @field:NotNull
    val roleId: Long
)
