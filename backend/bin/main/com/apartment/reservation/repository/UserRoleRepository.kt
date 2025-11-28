package com.apartment.reservation.repository

import com.apartment.reservation.model.entity.UserRole
import com.apartment.reservation.model.id.UserRoleId
import org.springframework.stereotype.Repository

@Repository
interface UserRoleRepository : BaseRepository<UserRole, UserRoleId> {
    fun findByUserId(userId: Long): List<UserRole>
    fun findByRoleId(roleId: Long): List<UserRole>
}
