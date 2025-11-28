package com.apartment.reservation.mapper

import com.apartment.reservation.dto.patch.ReservationPatchDTO
import com.apartment.reservation.dto.request.ReservationRequestDTO
import com.apartment.reservation.dto.response.ReservationResponseDTO
import com.apartment.reservation.model.entity.Apartment
import com.apartment.reservation.model.entity.Person
import com.apartment.reservation.model.entity.Reservation
import com.apartment.reservation.model.entity.User
import jakarta.persistence.EntityManager
import org.springframework.stereotype.Component
import java.time.LocalDate

@Component
open class ReservationMapper(
    private val entityManager: EntityManager
) {

    fun toEntity(dto: ReservationRequestDTO): Reservation {
        val apartmentRef    = entityManager.getReference(Apartment::class.java, dto.apartmentId)
        val userRef         = entityManager.getReference(User::class.java, dto.userId)

        return Reservation(
            apartment = apartmentRef,
            user = userRef,
            startDate = dto.startDate,
            endDate = dto.endDate
        )
    }

    fun toResponse(entity: Reservation): ReservationResponseDTO {
        return ReservationResponseDTO(
            apartmentId = entity.apartment.id!!,
            userId = entity.user.id!!,
            startDate = entity.startDate,
            endDate = entity.endDate,
            id = entity.id!!,
            createdAt = entity.createdAt,
            updatedAt = entity.updatedAt
        )
    }

    fun updateEntity(entity: Reservation, dto: ReservationPatchDTO): Reservation {
        dto.apartmentId?.let { entity.apartment.id = it }
        dto.userId?.let { entity.user.id = it }
        dto.startDate?.let { entity.startDate = it }
        dto.endDate?.let { entity.endDate = it }
        return entity
    }
}
