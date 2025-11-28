package com.apartment.reservation.service.impl

import com.apartment.reservation.mapper.BuildingMapper
import com.apartment.reservation.model.entity.Building
import com.apartment.reservation.repository.BuildingRepository
import com.apartment.reservation.service.CrudService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
open class BuildingServiceImpl(
    private val repository: BuildingRepository,
    private val mapper: BuildingMapper
) : CrudService<Building, Long> {

    @Transactional
    override fun create(entity: Building): Building {
        return repository.save(entity)
    }

    @Transactional
    override fun update(entity: Building): Building {
        return repository.save(entity)
    }

    @Transactional
    override fun delete(id: Long) {
        repository.findById(id).orElseThrow { RuntimeException("Building not found with id $id") }
            .also { repository.delete(it) }
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long): Building? {
        return repository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    override fun findAll(page: Int, size: Int) =
        repository.findAll(PageRequest.of(page, size))
}
