package com.apartment.reservation.controller

import com.apartment.reservation.dto.patch.ContactPatchDTO
import com.apartment.reservation.dto.request.ContactRequestDTO
import com.apartment.reservation.dto.response.ContactResponseDTO
import com.apartment.reservation.mapper.ContactMapper
import com.apartment.reservation.model.entity.Contact
import com.apartment.reservation.service.impl.ContactServiceImpl
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/contacts")
class ContactController(
    private val mapper: ContactMapper,
    service: ContactServiceImpl
) : GenericCrudController<Contact, Long, ContactRequestDTO, ContactResponseDTO, ContactPatchDTO>(service) {

    override fun toEntity(dto: ContactRequestDTO): Contact = mapper.toEntity(dto)
    override fun toResponse(entity: Contact): ContactResponseDTO = mapper.toResponse(entity)
    override fun updateEntity(entity: Contact, patch: ContactPatchDTO): Contact = mapper.updateEntity(entity, patch)
}
