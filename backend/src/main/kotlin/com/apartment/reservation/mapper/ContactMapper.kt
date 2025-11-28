package com.apartment.reservation.mapper

import com.apartment.reservation.dto.patch.ContactPatchDTO
import com.apartment.reservation.dto.request.ContactRequestDTO
import com.apartment.reservation.dto.response.ContactResponseDTO
import com.apartment.reservation.model.entity.Building
import com.apartment.reservation.model.entity.Contact
import com.apartment.reservation.model.entity.Person
import jakarta.persistence.EntityManager
import org.springframework.stereotype.Component

@Component
open class ContactMapper(
    private val entityManager: EntityManager
) {

    fun toEntity(dto: ContactRequestDTO): Contact {
        val personRef = entityManager.getReference(Person::class.java, dto.personId)
        return Contact(
            person = personRef,
            type = dto.type,
            value = dto.value,
            isMain = dto.isMain
        )
    }

    fun toResponse(entity: Contact): ContactResponseDTO {
        return ContactResponseDTO(
            personId = entity.person.id!!,
            type = entity.type,
            value = entity.value,
            isMain = entity.isMain,
            id = entity.id!!,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt
        )
    }

    fun updateEntity(entity: Contact, dto: ContactPatchDTO): Contact {
        dto.type?.let { entity.type = it }
        dto.value?.let { entity.value = it }
        dto.isMain?.let { entity.isMain = it }
        return entity
    }
}
