package com.apartment.reservation.service.impl

import com.apartment.reservation.mapper.RoleMapper
import com.apartment.reservation.model.entity.Role
import com.apartment.reservation.repository.RoleRepository
import com.apartment.reservation.service.CrudService
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
open class RoleServiceImpl(
    private val repository: RoleRepository,
    private val mapper: RoleMapper
) : CrudService<Role, Long> {

    @Transactional
    override fun create(entity: Role): Role {
        return repository.save(entity)
    }

    @Transactional
    override fun update(entity: Role): Role {
        return repository.save(entity)
    }

    @Transactional
    override fun delete(id: Long) {
        repository.findById(id).orElseThrow { RuntimeException("Role not found with id $id") }
            .also { repository.delete(it) }
    }

    @Transactional(readOnly = true)
    override fun findById(id: Long): Role? {
        return repository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    override fun findAll(page: Int, size: Int) =
        repository.findAll(PageRequest.of(page, size))
}
