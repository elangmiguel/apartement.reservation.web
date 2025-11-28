package com.apartment.reservation.mapper

import jakarta.persistence.EntityManager

import com.apartment.reservation.dto.patch.ApartmentPatchDTO
import com.apartment.reservation.dto.request.ApartmentRequestDTO
import com.apartment.reservation.dto.response.ApartmentResponseDTO
import com.apartment.reservation.model.entity.Apartment
import com.apartment.reservation.model.entity.Building
import org.springframework.stereotype.Component

@Component
open class ApartmentMapper(
    private val entityManager: EntityManager
) {

    fun toEntity(dto: ApartmentRequestDTO): Apartment {
        val buildingRef = entityManager.getReference(Building::class.java, dto.buildingId)
        return Apartment(
            building = buildingRef, // solo con id, lazy load
            number = dto.number,
            floor = dto.floor,
            capacity = dto.capacity,
            status = dto.status
        )
    }

    fun toResponse(entity: Apartment): ApartmentResponseDTO {
        return ApartmentResponseDTO(
            buildingId = entity.building.id!!,
            number = entity.number,
            floor = entity.floor,
            capacity = entity.capacity,
            status = entity.status,
            code = entity.code,
            id = entity.id!!,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt
        )
    }

    fun updateEntity(entity: Apartment, dto: ApartmentPatchDTO): Apartment {
        dto.number?.let { entity.number = it }
        dto.floor?.let { entity.floor = it }
        dto.capacity?.let { entity.capacity = it }
        dto.status?.let { entity.status = it }
        return entity
    }
}
