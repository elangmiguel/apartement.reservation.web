package com.apartment.reservation.repository

import com.apartment.reservation.model.entity.User
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : BaseRepository<User, Long> {
    fun findByUsername(username: String): User?
    fun existsByEmail(email: String): Boolean
}
