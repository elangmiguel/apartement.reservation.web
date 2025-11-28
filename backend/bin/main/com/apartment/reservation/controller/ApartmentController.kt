package com.apartment.reservation.controller

import com.apartment.reservation.dto.patch.ApartmentPatchDTO
import com.apartment.reservation.dto.request.ApartmentRequestDTO
import com.apartment.reservation.dto.response.ApartmentResponseDTO
import com.apartment.reservation.mapper.ApartmentMapper
import com.apartment.reservation.model.entity.Apartment
import com.apartment.reservation.service.impl.ApartmentServiceImpl
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/apartments")
class ApartmentController(
    private val mapper: ApartmentMapper,
    service: ApartmentServiceImpl
) : GenericCrudController<Apartment, Long, ApartmentRequestDTO, ApartmentResponseDTO, ApartmentPatchDTO>(service) {

    override fun toEntity(dto: ApartmentRequestDTO): Apartment = mapper.toEntity(dto)
    override fun toResponse(entity: Apartment): ApartmentResponseDTO = mapper.toResponse(entity)
    override fun updateEntity(entity: Apartment, patch: ApartmentPatchDTO): Apartment = mapper.updateEntity(entity, patch)
}
