package com.apartment.reservation.dto.request

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class UserRequestDTO(
    @field:NotBlank
    val username: String,

    val domain: String? = null,

    @field:Email
    val email: String? = null,

    @field:NotBlank
    val password: String
)
