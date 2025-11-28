package com.apartment.reservation.dto.request

import jakarta.validation.constraints.NotBlank

data class RoleRequestDTO(
    @field:NotBlank
    val name: String
)
