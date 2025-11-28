package com.apartment.reservation.dto.patch

data class UserRolePatchDTO(
    val userId: Long? = null,
    val roleId: Long? = null
)
