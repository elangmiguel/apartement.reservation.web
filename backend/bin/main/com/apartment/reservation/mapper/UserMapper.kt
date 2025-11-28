package com.apartment.reservation.mapper

import com.apartment.reservation.dto.patch.UserPatchDTO
import com.apartment.reservation.dto.request.UserRequestDTO
import com.apartment.reservation.dto.response.UserResponseDTO
import com.apartment.reservation.model.entity.User
import com.apartment.reservation.model.enum.UserStatus
import jakarta.persistence.EntityManager
import org.springframework.stereotype.Component

@Component
open class UserMapper(
    private val entityManager: EntityManager
) {

    fun toEntity(dto: UserRequestDTO): User {
        return User(
            username = dto.username,
            domain = dto.domain,
            email = dto.email ?: "${dto.username}@${dto.domain}",
            passwordHash = dto.password,
            status = UserStatus.ACTIVE
        )
    }

    fun toResponse(entity: User): UserResponseDTO {
        return UserResponseDTO(
            username = entity.username,
            domain = entity.domain,
            email = entity.email ?: "${entity.username}@${entity.domain ?: "apartmentz.com"}",
            status = entity.status,
            id = entity.id!!,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt
        )
    }

    fun updateEntity(entity: User, dto: UserPatchDTO): User {
        dto.username?.let { entity.username = it }
        dto.domain?.let { entity.domain = it }
        dto.email?.let { entity.email = it }
        dto.password?.let { entity.passwordHash = it }
        dto.status?.let { entity.status = it }
        return entity
    }
}
