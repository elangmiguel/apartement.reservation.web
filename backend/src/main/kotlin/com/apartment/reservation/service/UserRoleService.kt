package com.apartment.reservation.service

import com.apartment.reservation.model.entity.UserRole
import com.apartment.reservation.model.id.UserRoleId
import org.springframework.data.domain.Page

interface UserRoleService {
    fun create(entity: UserRole): UserRole
    fun update(entity: UserRole): UserRole
    fun delete(id: UserRoleId)
    fun findById(id: UserRoleId): UserRole?
    fun findAll(page: Int, size: Int): Page<UserRole>
}
