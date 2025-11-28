package com.apartment.reservation.model.id

import java.io.Serializable
import jakarta.persistence.Embeddable

/**
 * Composed Id user - role
 */
@Embeddable
data class UserRoleId(
    var userId: Long? = null,
    var roleId: Long? = null
) : Serializable
