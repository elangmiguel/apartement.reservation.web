package com.apartment.reservation.service.impl

import com.apartment.reservation.mapper.ApartmentMapper
import com.apartment.reservation.model.entity.Apartment
import com.apartment.reservation.repository.ApartmentRepository
import com.apartment.reservation.service.CrudService
import org.springframework.transaction.annotation.Transactional
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
open class ApartmentServiceImpl(
    private val repository: ApartmentRepository,
    private val mapper: ApartmentMapper
) : CrudService<Apartment, Long> {

    @Transactional
    override fun create(entity: Apartment): Apartment {
        return repository.save(entity)
    }

    @Transactional
    override fun update(entity: Apartment): Apartment {
        return repository.save(entity)
    }

    @Transactional
    override fun delete(id: Long) {
        repository.findById(id).orElseThrow { RuntimeException("Apartment not found with id $id") }
            .also { repository.delete(it) }
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long): Apartment? {
        return repository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    override fun findAll(page: Int, size: Int) =
        repository.findAll(PageRequest.of(page, size))
}
