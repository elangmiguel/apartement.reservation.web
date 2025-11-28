package com.apartment.reservation.mapper

import com.apartment.reservation.dto.patch.UserRolePatchDTO
import com.apartment.reservation.dto.request.UserRoleRequestDTO
import com.apartment.reservation.dto.response.UserRoleResponseDTO
import com.apartment.reservation.model.entity.UserRole
import com.apartment.reservation.model.entity.User
import com.apartment.reservation.model.entity.Role
import jakarta.persistence.EntityManager
import org.springframework.stereotype.Component

@Component
open class UserRoleMapper(
    private val entityManager: EntityManager
) {

    fun toEntity(dto: UserRoleRequestDTO): UserRole {
        val userRef = entityManager.getReference(User::class.java, dto.userId)
        val roleRef = entityManager.getReference(Role::class.java, dto.roleId)

        return UserRole(
            user = userRef,
            role = roleRef
        )
    }

    fun toResponse(entity: UserRole): UserRoleResponseDTO {
        return UserRoleResponseDTO(
            userId = entity.user?.id!!,
            roleId = entity.role?.id!!,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt
        )
    }

    fun updateEntity(entity: UserRole, dto: UserRolePatchDTO): UserRole {
        entity.user = entityManager.getReference(User::class.java, dto.userId)
        entity.role = entityManager.getReference(Role::class.java, dto.roleId)
        return entity
    }
}

