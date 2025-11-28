package com.apartment.reservation.mapper

import com.apartment.reservation.dto.patch.BuildingPatchDTO
import com.apartment.reservation.dto.request.BuildingRequestDTO
import com.apartment.reservation.dto.response.BuildingResponseDTO
import com.apartment.reservation.model.entity.Building
import jakarta.persistence.EntityManager
import org.springframework.stereotype.Component

@Component
open class BuildingMapper(
    private val entityManager: EntityManager
) {
    fun toEntity(dto: BuildingRequestDTO): Building {
        return Building(
            name = dto.name,
            address = dto.address
        )
    }

    fun toResponse(entity: Building): BuildingResponseDTO {
        return BuildingResponseDTO(
            name = entity.name!!,
            address = entity.address!!,
            id = entity.id!!,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt
        )
    }

    fun updateEntity(entity: Building, dto: BuildingPatchDTO): Building {
        dto.name?.let { entity.name = it }
        dto.address?.let { entity.address = it }
        return entity
    }
}
