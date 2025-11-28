package com.apartment.reservation.service.impl

import com.apartment.reservation.mapper.PersonMapper
import com.apartment.reservation.model.entity.Person
import com.apartment.reservation.repository.PersonRepository
import com.apartment.reservation.service.CrudService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
open class PersonServiceImpl(
    private val repository: PersonRepository,
    private val mapper: PersonMapper
) : CrudService<Person, Long> {

    @Transactional
    override fun create(entity: Person): Person {
        return repository.save(entity)
    }

    @Transactional
    override fun update(entity: Person): Person {
        return repository.save(entity)
    }

    @Transactional
    override fun delete(id: Long) {
        repository.findById(id).orElseThrow { RuntimeException("Person not found with id $id") }
            .also { repository.delete(it) }
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long): Person? {
        return repository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    override fun findAll(page: Int, size: Int) =
        repository.findAll(PageRequest.of(page, size))
}
