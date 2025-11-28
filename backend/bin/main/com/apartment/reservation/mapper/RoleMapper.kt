package com.apartment.reservation.mapper

import com.apartment.reservation.dto.patch.RolePatchDTO
import com.apartment.reservation.dto.request.RoleRequestDTO
import com.apartment.reservation.dto.response.RoleResponseDTO
import com.apartment.reservation.model.entity.Role
import jakarta.persistence.EntityManager
import org.springframework.stereotype.Component

@Component
open class RoleMapper(
    private val entityManager: EntityManager
) {

    fun toEntity(dto: RoleRequestDTO): Role {
        return Role(name = dto.name)
    }

    fun toResponse(entity: Role): RoleResponseDTO {
        return RoleResponseDTO(
            name = entity.name!!,
            id = entity.id!!,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt
        )
    }

    fun updateEntity(entity: Role, dto: RolePatchDTO): Role {
        dto.name?.let { entity.name = it }
        return entity
    }
}
