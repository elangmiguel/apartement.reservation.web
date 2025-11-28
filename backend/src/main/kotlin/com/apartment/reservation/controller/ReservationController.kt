package com.apartment.reservation.controller

import com.apartment.reservation.dto.patch.ReservationPatchDTO
import com.apartment.reservation.dto.request.ReservationRequestDTO
import com.apartment.reservation.dto.response.ReservationResponseDTO
import com.apartment.reservation.mapper.ReservationMapper
import com.apartment.reservation.model.entity.Reservation
import com.apartment.reservation.service.impl.ReservationServiceImpl
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/reservations")
class ReservationController(
    private val mapper: ReservationMapper,
    service: ReservationServiceImpl
) : GenericCrudController<Reservation, Long, ReservationRequestDTO, ReservationResponseDTO, ReservationPatchDTO>(service) {

    override fun toEntity(dto: ReservationRequestDTO): Reservation = mapper.toEntity(dto)
    override fun toResponse(entity: Reservation): ReservationResponseDTO = mapper.toResponse(entity)
    override fun updateEntity(entity: Reservation, patch: ReservationPatchDTO): Reservation = mapper.updateEntity(entity, patch)
}
