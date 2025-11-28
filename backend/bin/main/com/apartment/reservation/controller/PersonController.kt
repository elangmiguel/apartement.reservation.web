package com.apartment.reservation.controller

import com.apartment.reservation.dto.patch.PersonPatchDTO
import com.apartment.reservation.dto.request.PersonRequestDTO
import com.apartment.reservation.dto.response.PersonResponseDTO
import com.apartment.reservation.mapper.PersonMapper
import com.apartment.reservation.model.entity.Person
import com.apartment.reservation.service.impl.PersonServiceImpl
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/persons")
class PersonController(
    private val mapper: PersonMapper,
    service: PersonServiceImpl
) : GenericCrudController<Person, Long, PersonRequestDTO, PersonResponseDTO, PersonPatchDTO>(service) {

    override fun toEntity(dto: PersonRequestDTO): Person = mapper.toEntity(dto)
    override fun toResponse(entity: Person): PersonResponseDTO = mapper.toResponse(entity)
    override fun updateEntity(entity: Person, patch: PersonPatchDTO): Person = mapper.updateEntity(entity, patch)
}
