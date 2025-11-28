package com.apartment.reservation.repository

import com.apartment.reservation.model.entity.Role
import org.springframework.stereotype.Repository

@Repository
interface RoleRepository : BaseRepository<Role, Long> {
    fun findByName(name: String): Role?
}
