package com.apartment.reservation.controller

import com.apartment.reservation.dto.patch.BuildingPatchDTO
import com.apartment.reservation.dto.request.BuildingRequestDTO
import com.apartment.reservation.dto.response.BuildingResponseDTO
import com.apartment.reservation.mapper.BuildingMapper
import com.apartment.reservation.model.entity.Building
import com.apartment.reservation.service.impl.BuildingServiceImpl
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/buildings")
class BuildingController(
    private val mapper: BuildingMapper,
    service: BuildingServiceImpl
) : GenericCrudController<Building, Long, BuildingRequestDTO, BuildingResponseDTO, BuildingPatchDTO>(service) {

    override fun toEntity(dto: BuildingRequestDTO): Building = mapper.toEntity(dto)
    override fun toResponse(entity: Building): BuildingResponseDTO = mapper.toResponse(entity)
    override fun updateEntity(entity: Building, patch: BuildingPatchDTO): Building = mapper.updateEntity(entity, patch)
}
