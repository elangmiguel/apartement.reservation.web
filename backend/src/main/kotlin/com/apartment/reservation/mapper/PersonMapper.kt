package com.apartment.reservation.mapper

import com.apartment.reservation.dto.patch.PersonPatchDTO
import com.apartment.reservation.dto.request.PersonRequestDTO
import com.apartment.reservation.dto.response.PersonResponseDTO
import com.apartment.reservation.model.entity.Person
import jakarta.persistence.EntityManager
import org.springframework.stereotype.Component

@Component
open class PersonMapper(
    private val entityManager: EntityManager
) {

    fun toEntity(dto: PersonRequestDTO): Person {
        return Person(
            firstName = dto.firstName,
            lastName = dto.lastName,
            identityType = dto.identityType,
            identityValue = dto.identityValue,
            gender = dto.gender,
            user = null
        )
    }

    fun toResponse(entity: Person): PersonResponseDTO {
        return PersonResponseDTO(
            firstName = entity.firstName!!,
            lastName = entity.lastName!!,
            identityType = entity.identityType!!,
            identityValue = entity.identityValue!!,
            gender = entity.gender,
            birthDate = entity.birthDate!!,
            id = entity.id!!,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt
        )
    }

    fun updateEntity(entity: Person, dto: PersonPatchDTO): Person {
        dto.firstName?.let { entity.firstName = it }
        dto.lastName?.let { entity.lastName = it }
        dto.identityType?.let { entity.identityType = it }
        dto.identityValue?.let { entity.identityValue = it }
        dto.gender?.let { entity.gender = it }
        dto.birthDate?.let { entity.birthDate = it }
        return entity
    }
}
