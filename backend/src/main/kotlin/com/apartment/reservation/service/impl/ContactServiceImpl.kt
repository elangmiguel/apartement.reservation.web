package com.apartment.reservation.service.impl

import com.apartment.reservation.mapper.ContactMapper
import com.apartment.reservation.model.entity.Contact
import com.apartment.reservation.repository.ContactRepository
import com.apartment.reservation.service.CrudService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
open class ContactServiceImpl(
    private val repository: ContactRepository,
    private val mapper: ContactMapper
) : CrudService<Contact, Long> {

    @Transactional
    override fun create(entity: Contact): Contact {
        return repository.save(entity)
    }

    @Transactional
    override fun update(entity: Contact): Contact {
        return repository.save(entity)
    }

    @Transactional
    override fun delete(id: Long) {
        repository.findById(id).orElseThrow { RuntimeException("Contact not found with id $id") }
            .also { repository.delete(it) }
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long): Contact? {
        return repository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    override fun findAll(page: Int, size: Int) =
        repository.findAll(PageRequest.of(page, size))
}
