package com.apartment.reservation.controller

import com.apartment.reservation.dto.patch.RolePatchDTO
import com.apartment.reservation.dto.request.RoleRequestDTO
import com.apartment.reservation.dto.response.RoleResponseDTO
import com.apartment.reservation.mapper.RoleMapper
import com.apartment.reservation.model.entity.Role
import com.apartment.reservation.service.impl.RoleServiceImpl
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/roles")
class RoleController(
    private val mapper: RoleMapper,
    service: RoleServiceImpl
) : GenericCrudController<Role, Long, RoleRequestDTO, RoleResponseDTO, RolePatchDTO>(service) {

    override fun toEntity(dto: RoleRequestDTO): Role = mapper.toEntity(dto)
    override fun toResponse(entity: Role): RoleResponseDTO = mapper.toResponse(entity)
    override fun updateEntity(entity: Role, patch: RolePatchDTO): Role = mapper.updateEntity(entity, patch)
}
