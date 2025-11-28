package com.apartment.reservation.service.impl

import com.apartment.reservation.model.entity.UserRole
import com.apartment.reservation.model.id.UserRoleId
import com.apartment.reservation.repository.UserRoleRepository
import com.apartment.reservation.service.UserRoleService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
open class UserRoleServiceImpl(
    private val userRoleRepository: UserRoleRepository
) : UserRoleService {

    @Transactional
    override fun create(entity: UserRole): UserRole {
        return userRoleRepository.save(entity)
    }

    @Transactional
    override fun update(entity: UserRole): UserRole {
        // Opcional: validar que existe antes de actualizar
        val existing = userRoleRepository.findById(UserRoleId(entity.user?.id!!, entity.role?.id!!))
            .orElseThrow { RuntimeException("UserRole not found") }
        return userRoleRepository.save(entity)
    }

    @Transactional
    override fun delete(id: UserRoleId) {
        val entity = userRoleRepository.findById(id)
            .orElseThrow { RuntimeException("UserRole not found with id $id") }
        userRoleRepository.delete(entity)
    }

    @Transactional(readOnly = true)
    override fun findById(id: UserRoleId): UserRole? {
        return userRoleRepository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    override fun findAll(page: Int, size: Int): Page<UserRole> {
        return userRoleRepository.findAll(PageRequest.of(page, size))
    }
}
