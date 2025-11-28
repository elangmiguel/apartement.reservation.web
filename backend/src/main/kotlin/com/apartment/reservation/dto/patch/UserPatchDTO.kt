package com.apartment.reservation.dto.patch

import com.apartment.reservation.model.enum.UserStatus

data class UserPatchDTO(
    val username: String? = null,
    val domain: String? = null,
    val email: String? = null,
    val password: String? = null,
    val status: UserStatus? = null
)
