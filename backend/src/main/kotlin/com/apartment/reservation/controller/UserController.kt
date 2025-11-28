package com.apartment.reservation.controller

import com.apartment.reservation.dto.patch.UserPatchDTO
import com.apartment.reservation.dto.request.UserRequestDTO
import com.apartment.reservation.dto.response.UserResponseDTO
import com.apartment.reservation.mapper.UserMapper
import com.apartment.reservation.model.entity.User
import com.apartment.reservation.service.impl.UserServiceImpl
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/users")
class UserController(
    private val mapper: UserMapper,
    service: UserServiceImpl
) : GenericCrudController<User, Long, UserRequestDTO, UserResponseDTO, UserPatchDTO>(service) {

    override fun toEntity(dto: UserRequestDTO): User = mapper.toEntity(dto)
    override fun toResponse(entity: User): UserResponseDTO = mapper.toResponse(entity)
    override fun updateEntity(entity: User, patch: UserPatchDTO): User = mapper.updateEntity(entity, patch)
}
