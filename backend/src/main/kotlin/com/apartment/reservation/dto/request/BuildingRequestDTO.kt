package com.apartment.reservation.dto.request

import jakarta.validation.constraints.NotBlank

data class BuildingRequestDTO(
    @field:NotBlank
    val name: String,

    @field:NotBlank
    val address: String
)
